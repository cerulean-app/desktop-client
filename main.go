package main

import (
	_ "embed"
	"encoding/json"
	"log"
	"os"
	"strings"

	"github.com/webview/webview"
)

const html = `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- Use minimum-scale=1 to enable GPU rasterization -->
  <meta
    name='viewport'
    content='user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height'
  />
	<style>
	body {
		margin: 0;
		font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",
		  Ubuntu,Cantarell,Oxygen-Sans,"Helvetica Neue",Arial,Roboto,sans-serif;
	}
	* { margin: 0; padding: 0; }
  </style>
</head>
<body><div id="app"></div><script>initiateReact()</script></body>
</html>
`

//go:embed dist/main.js
var js string
var w webview.WebView

const REQ_URL string = "http://localhost:7292" // TODO: Add some config around this.

// ParseToJsString takes a string and escapes slashes and double-quotes,
// and converts it to a string that can be passed to JavaScript.
func ParseToJsString(s string) string {
	return "\"" + strings.ReplaceAll(strings.ReplaceAll(s, "\\", "\\\\"), "\"", "\\\"") + "\""
}

// SetToken sets the value of the config.Token variable in both Go and React.
func SetToken(value string) {
	config.Token = value
	w.Eval("setTokenReact(" + ParseToJsString(value) + ")")
	SaveConfig()
}

// SetCache sets the value of the config.Cache variable in both Go and React.
func SetCache(cache []Todo) {
	value, err := json.Marshal(cache)
	if err != nil {
		log.Println("failed to serialise []Todo to JSON to send to webview")
		return
	}
	config.Cache = cache
	w.Eval("setCacheReact(JSON.parse(" + ParseToJsString(string(value)) + "))")
	SaveConfig()
}

func main() {
	jsLogger := log.New(os.Stderr, "webview: ", log.LstdFlags)
	log.SetPrefix("native: ")
	ReadConfig()
	SaveConfig()

	debug := true
	w = webview.New(debug)
	defer w.Destroy()
	w.SetTitle("Cerulean")
	w.SetSize(325, 525, webview.HintMin)

	// Bind variables.
	w.Bind("setTokenGo", func(newToken string) { config.Token = newToken; SaveConfig() })
	w.Bind("setCacheGo", func(newToken string) { config.Token = newToken; SaveConfig() })

	// Bind a function to initiate React via webview.Eval.
	w.Bind("initiateReact", func() {
		value, err := json.Marshal(config.Cache)
		if err != nil {
			log.Println("failed to serialise []Todo to JSON to send to webview")
		}
		w.Eval("window.cache = " + ParseToJsString(string(value)))
		w.Eval("window.token = " + ParseToJsString(config.Token))
		w.Eval("window.reqUrl = " + ParseToJsString(REQ_URL))
		w.Eval(js)
	})
	w.Bind("log", func(output interface{}) {
		jsLogger.Println(output)
	})

	w.Navigate("data:text/html," + html)
	w.Run()
}
