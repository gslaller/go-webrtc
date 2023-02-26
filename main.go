package main

import (
	"fmt"

	Controller "github.com/gslaller/go-webrtc/controller"
)

func main() {

	config := GetConfigurations()

	if config.tls {
		// TODO: fetch the letsencrypt certificates
		fmt.Println("TLS is enabled, believe me ;)")
	}

	router := Controller.StartServer()
	router.Run()

}

/*

What is due today?
1. The home page
	1. This is just going to have a Create a new Room Button.
	2. And a list of all the rooms that are currently active.
2. The room page
	1. This page is always going to open with a form filler.
		1. The name of the room if not given.
		2. The name of the user if not given.
		3. The camera/screen sharing and microphone permissions are set.
		4. The selection of camera and microphone is selected from the list.
	2. The room will allow the user to chat through text with the datachannel from webrtc.
3. The backend
	1. The backend will be a gin server.
	2. The routes are as follows:
		1. /room?rooname=roomname&username=username
		2. / <- this is the home page
		3. /assets <- this is the static folder
		4. /favicon.ico <- this is the favicon
	3. The backend will not have any database.
	4. The room should allow max 10 people. A: don't worry about this stuff.
	5. Is there any limit to the number of rooms? A: don't worry about this stuff.
	6. Is the messages retained, or is just a fire and forget chat? This is the easiest way to do it.
	6.1 Should a user also be able to send files over?
	7. The backend will be a simple container that will be deployed on a server.
	8. You can set flags for letsencrypt.
	9. If the https is set, the http will be redirected to https.
This is all the
*/
