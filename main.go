package main

import (
	_ "embed"
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
  </style>
</head>
<body><div id="app"></div><script>initiateReact()</script></body>
</html>
`

var w webview.WebView

// var file = ""

// ParseToJsString takes a string and escapes slashes and double-quotes,
// and converts it to a string that can be passed to JavaScript.
func ParseToJsString(s string) string {
	return "\"" + strings.ReplaceAll(strings.ReplaceAll(s, "\\", "\\\\"), "\"", "\\\"") + "\""
}

//go:embed dist/main.js
var js string

// SetFile sets the value of the file variable in both Go and React.
// func SetFile(value string) {file = value;w.Eval("setFileReact(" + ParseToJsString(value) + ")")}

func main() {
	debug := true
	w = webview.New(debug)
	defer w.Destroy()
	w.SetTitle("Cerulean")
	w.SetSize(325, 525, webview.HintMin)

	// Bind variables.
	// w.Bind("setFileGo", func(newFile string) {file = newFile})

	// Bind a function to initiate React via webview.Eval.
	w.Bind("initiateReact", func() { w.Eval(js) })

	w.Navigate("data:text/html," + html)
	w.Run()
}
