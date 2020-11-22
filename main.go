package main

import (
	"log"
	"os"

	"fmt"
	"github.com/urfave/cli"
	"apb-test/lib/create"
)

func main() {
	app := cli.NewApp()
	app.Name = "apb-cli"
	app.Usage = "Command line tool for developing APB CSS (Atomic Parts Base CSS)"
	app.Version = "1.0.0"

	app.Flags = []cli.Flag{
		&cli.StringFlag{
			Name: "path",
			Aliases: []string{"p"},
			Usage: "Load configuration",
		},
	}

	app.Commands = []*cli.Command{
		{
			Name:    "generate",
			Aliases: []string{"g"},
			Usage:   "generate scss files from `assetsType`",
			Action:  func(c *cli.Context) error {
				fmt.Println("path:", c.String("path"))
				fmt.Println("assetsType: ", c.Args().First())
				create.Start("", c.String("path"), c.Args().First())
				return nil
			},
		},
		{
			Name:    "new",
			Aliases: []string{"n"},
			Usage:   "create APB scss files",
			Action:  func(c *cli.Context) error {
				create.Start(c.Args().First(), c.String("path"), "")
				return nil
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}