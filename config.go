package main

import (
	"encoding/json"
	"errors"
	"log"
	"os"
	"path/filepath"
)

var config Config

type Config struct {
	Token string `json:"accessToken"`
}

func GetConfigFilePath() string {
	configDir, err := os.UserConfigDir()
	if err != nil {
		log.Panicln("unable to find config dir on operating system", err)
	}
	return filepath.Join(configDir, "cerulean.json")
}

func ReadConfig() {
	configFile, err := os.ReadFile(GetConfigFilePath())
	if errors.Is(err, os.ErrNotExist) {
		log.Println("unable to find cerulean.json in config dir, using fresh config")
		return
	} else if err != nil {
		log.Println("unable to read cerulean.json in config dir, using fresh config")
		return
	}
	err = json.Unmarshal(configFile, &config)
	if err != nil {
		log.Println("broken cerulean.json in config dir, using fresh config")
		return
	}
}
