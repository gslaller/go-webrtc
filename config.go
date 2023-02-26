package main

import "flag"

type configuration struct {
	port   string
	domain string
	email  string
	tls    bool
}

func GetConfigurations() *configuration {

	port := flag.String("port", "8080", "port to listen on")
	domain := flag.String("domain", "", "domain name for https let's encrypt")
	email := flag.String("email", "", "email for https let's encrypt")

	flag.Parse()

	tls := false
	if *domain != "" && *email != "" {
		tls = true
	}

	config := configuration{
		port:   *port,
		domain: *domain,
		email:  *email,
		tls:    tls,
	}

	return &config

}
