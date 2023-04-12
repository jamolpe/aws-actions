package main

import (
	"encoding/json"
	"io/ioutil"
	"strings"
)

type ActionObject struct {
	Name      string   `json:"name"`
	Actions   []string `json:"actions"`
	Prefix    string   `json:"prefix"`
	ARNFormat string   `json:"arn_format"`
	ARNRegex  string   `json:"arn_regex"`
}

type OutputObject struct {
	ReadActions  []string `json:"readActions"`
	WriteActions []string `json:"writeActions"`
	ListActions  []string `json:"listActions"`
	Prefix       string   `json:"prefix"`
	ARNFormat    string   `json:"arn_format"`
	ARNRegex     string   `json:"arn_regex"`
	Name         string   `json:"name"`
}

func main() {
	// Read the input JSON file
	jsonString, err := ioutil.ReadFile("./files/actions.json")
	if err != nil {
		panic(err)
	}

	// Parse the JSON data
	var parsedData []ActionObject
	err = json.Unmarshal(jsonString, &parsedData)
	if err != nil {
		panic(err)
	}

	// Define the prefixes
	readPrefixes := []string{"Get", "Describe"}
	listPrefixes := []string{"List"}

	// Create the output object
	outputData := make(map[string]OutputObject)
	for _, obj := range parsedData {
		readActions := make([]string, 0)
		writeActions := make([]string, 0)
		listActions := make([]string, 0)

		for _, action := range obj.Actions {
			if startsWithAny(action, readPrefixes) {
				readActions = append(readActions, action)
			} else if startsWithAny(action, listPrefixes) {
				listActions = append(listActions, action)
			} else {
				writeActions = append(writeActions, action)
			}
		}

		outputData[obj.Prefix] = OutputObject{
			ReadActions:  readActions,
			WriteActions: writeActions,
			ListActions:  listActions,
			Prefix:       obj.Prefix,
			ARNFormat:    obj.ARNFormat,
			ARNRegex:     obj.ARNRegex,
			Name:         obj.Name,
		}
	}

	// Convert the output object to JSON and write to a file
	outputJson, err := json.MarshalIndent(outputData, "", "  ")
	if err != nil {
		panic(err)
	}
	err = ioutil.WriteFile("./files/output.json", outputJson, 0644)
	if err != nil {
		panic(err)
	}
}

func startsWithAny(str string, prefixes []string) bool {
	for _, prefix := range prefixes {
		if strings.HasPrefix(str, prefix) {
			return true
		}
	}
	return false
}
