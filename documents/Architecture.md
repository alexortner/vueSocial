Mitgliederverzeichnis
####################




Notification Tracker
####################

jede relevante Aktion schreibt ein status in den Firestore

notification_tracker={
	id: count up or random
	timestamp: creation of event
	type: type of event 
		[
			image upload
			address change
			forum new post
			forum antwort
			neue mitteilung
			neue Veranstaltung
		]
	emitter: [user or system]
	message: text that should be displayed
	metainformation: what else 
}


Forum
##########
https://code.tutsplus.com/tutorials/how-to-create-a-phpmysql-powered-forum-from-scratch--net-10188

https://github.com/hoppula/refire-forum

https://webmobtuts.com/frontend-development/vuejs-tutorials/building-a-simple-forum-with-vue-js-vuex-and-firebase-part1-authentication/

Is firebase the best solution
https://crisp.chat/blog/why-you-should-never-use-firebase-realtime-database/

dbdiagram.io

Table users {
  id int PK
  user_name text
  user_email text
  last_login datetime
}

Table topics {
  id int PK
  subject text
  created_date datetime
  created_by int
}

Table posts {
  id int PK
  content text
  topic text
  created_date datetime
  created_by int
}

Ref: users.id < topics.created_by
Ref: users.id < posts.created_by
Ref: posts.topic < topics.id