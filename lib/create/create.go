package create

import (
	"github.com/gobuffalo/packr/v2"
	"log"
	"io/ioutil"
	"os"
	"fmt"
	"path/filepath"
	"path"
	"regexp"
)

func Start(dirName string, targetPath string, assetsType string) {
	box := packr.New("cssBox", "./templates/scss")

	createPath, _ := os.Getwd()
	if len(targetPath) > 0 {
		createPath = path.Join(createPath, targetPath)
	}

	makeDirName := "scss"
	if len(dirName) > 0 {
		makeDirName = dirName
	}

	createTargetDirNameList := getCreateTargetDirNameList(assetsType)

	for _, createTargetDirName := range createTargetDirNameList {
		makeDir(createPath, makeDirName, createTargetDirName)
	}

	createFiles(box, createPath, makeDirName, assetsType)
}

func makeDir(curDir string, makeDirName string, createTargetDirName string)  {
	makePath := filepath.Join(curDir, makeDirName + "/" + createTargetDirName)
	err := os.MkdirAll(makePath, 0755)
	if err != nil {
		panic(err)
	}
}

func createFiles(box *packr.Box, createPath string, makeDirName string, assetsType string)  {
	for _, file := range box.List() {
		if len(assetsType) > 0 {
			r := regexp.MustCompile("^" + assetsType)
			if r.MatchString(file) {
				s, err := box.Find(file)
				err = ioutil.WriteFile(createPath + "/" + makeDirName + "/" + file, s, 0644)
				if err != nil {
					log.Fatal(err)
				}
			}
		} else {
			s, err := box.Find(file)
			err = ioutil.WriteFile(createPath + "/" + makeDirName + "/" + file, s, 0644)
			if err != nil {
				log.Fatal(err)
			}
		}
	}
}

func getCreateTargetDirNameList(assetsType string) []string {
	if len(assetsType) > 0 {
		createTargetDirNameList := []string{""}
		return append(createTargetDirNameList, assetsType)
	}

	return []string{"", "base", "pages", "parts"}
}