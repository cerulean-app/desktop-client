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
	Cache []Todo `json:"cache"`
}

type Todo struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Done        bool   `json:"done"`
	DueDate     string `json:"dueDate"`
	CreatedAt   string `json:"createdAt"`
	UpdatedAt   string `json:"updatedAt"`
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

func SaveConfig() {
	file, err := json.Marshal(config)
	if err != nil {
		log.Println("unable to convert config to json, not saving")
		return
	}
	err = os.WriteFile(GetConfigFilePath(), file, 0644)
	if err != nil {
		log.Println("unable to write json config to file, not saving")
		return
	}
}
