<template>
	<nav>
		<v-app-bar app color="indigo darken-3" dark clipped-left>
			<v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="text-uppercase grey--text">
				<div class="hidden-sm-and-down">{{title}}</div>
				<div class="hidden-md-and-up">{{title_short}}</div>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<!-- Notification dropdown-->
			<v-menu  offset-y :close-on-content-click="false" v-if="user">
				<template v-slot:activator="{ on }">
					<v-btn icon slot='activator' v-on="on">
						<v-badge color="red" overlap>
							<template v-slot:badge>
								<span >{{notification_items.length}}</span>
							</template>
							<v-icon >mdi-bell</v-icon>
						</v-badge>
					</v-btn>
				</template>

				<v-card max-width="450"  class="mx-auto">
					<!--
					<v-list two-line>
						<v-list-item v-for="item in notification_items" :key="item.id" router :to="item.route">
							<v-list-item-avatar>
								<v-icon class="grey lighten-3">{{item.icon}}</v-icon>
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title><span class="font-weight-medium">{{item.topic}}</span></v-list-item-title>
								<v-list-item-subtitle>{{item.message}}</v-list-item-subtitle>
							</v-list-item-content>

						</v-list-item>	
					</v-list>

					-->
					<v-list>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title><span>Neues seit deinem letzten Login</span></v-list-item-title>
								<v-list-item-subtitle>Letzter Login vor 4 Tagen</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>	
					</v-list>

					<v-divider></v-divider>

					<v-list two-line dense>
						<v-list-item-group v-model="selected" multiple active-class="red--text darken-4">
							<template v-for="(item,index) in notification_items">
								<v-list-item :key="index">

									<template v-slot:default="{ active, toggle }">

										<v-list-item-avatar>
											<v-icon class="grey lighten-3">{{item.icon}}</v-icon>
										</v-list-item-avatar>

										<v-list-item-content>
											<v-list-item-title>{{item.topic}}</v-list-item-title>
											<v-list-item-subtitle>{{item.message}}</v-list-item-subtitle>
										</v-list-item-content>

										<v-list-item-action>
											<v-list-item-action-text color="grey" small>{{item.timestamp}}</v-list-item-action-text>
											<v-icon v-if="!active" color="grey lighten-1">
											mdi-circle-outline
											</v-icon>

											<v-icon v-else color="grey darken-2">
											mdi-checkbox-marked-circle
											</v-icon>
										</v-list-item-action>
									</template>
								</v-list-item>

								<v-divider v-if="index + 1 < notification_items.length" :key="index" inset></v-divider>
								<v-divider v-else :key="index"></v-divider>

							</template>
						</v-list-item-group>
					</v-list>

					<v-spacer></v-spacer>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn small>
							<v-icon left>mdi-check</v-icon>Alle als gelesen markieren
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-menu>
			<!-- Profile dropdown-->
			<v-menu  offset-y v-if="user">
				<template v-slot:activator="{ on }">
					<v-btn icon slot='activator' v-on="on">
					<v-icon>mdi-account</v-icon>
				</v-btn>
				</template>

				<v-card>
					<v-list>
						<v-list-item>
							<v-list-item-avatar>
								<img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title>Alex Ortner</v-list-item-title>
								<v-list-item-subtitle>Alter Herr (Admin)</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>
					<v-divider></v-divider>

					<v-list  dense >
						<v-list-item v-for="item in user_menu_items" :key="item.title" router :to="item.route">
							<v-list-item-icon>
								<v-icon>{{ item.icon }}</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>{{ item.title }}</v-list-item-title>
								<v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>
					<v-divider></v-divider>
					<v-list  dense>
						<v-list-item>
							<v-list-item-icon>
								<v-icon>mdi-power</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Logout</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-card>
			</v-menu>

			<v-btn text depressed small outlined rounded v-if="!user" @click="login"><span>Login</span></v-btn>
			<v-btn text depressed small outlined rounded v-if="user" @click="logout"><span>Logout</span></v-btn>


		</v-app-bar>

		<!-- left side navigation drawer -->
		<v-navigation-drawer app v-model="drawer" clipped >
			<template v-slot:prepend>
				<v-list-item two-line>
					<v-list-item-avatar>
						<img src="@/assets/wappen.png">
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>Interna</v-list-item-title>
						<v-list-item-subtitle>Markomanno-Albertia</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</template>

			<v-divider></v-divider>

			<v-list>
				<v-list-item v-for="item in menu_items" :key="item.title" router :to="item.route">
				<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

		</v-navigation-drawer>
	</nav>
  
</template>

<script>
// @ is an alias to /src
import firebase from '@/firebase/init'

export default {

	name: 'Navbar',
	data(){
		return{
			title:'T! Markomanno-Albertia',
			title_short: 'T! MA',
			selected: [],
			user: null,
			drawer: null,
			menu_items: [
				{ title: 'Pinnwand', icon: 'mdi-view-dashboard', route: '/wall' },
				{ title: 'Mitteilungen', icon: 'mdi-bullhorn', route: '/news' },
				{ title: 'Diskussionen', icon: 'mdi-forum' , route: '/forum' },
				{ title: 'Veranstaltungen', icon: 'mdi-calendar-clock' , route: '/events' },
				{ title: 'Mitgliederverzeichnis', icon: 'mdi-account-group' , route: '/members' },
				{ title: 'Photos', icon: 'mdi-image-multiple' , route: '/photos3' },				
				{ title: 'Hütte', icon: 'mdi-home' , route: '/booking' },
			],
			user_menu_items: [
				{ title: 'Meine Daten', subtitle: 'Eigene Daten bearbeiten', icon: 'mdi-account-edit', route: '/member_edit' },
				{ title: 'Passwort ändern', subtitle: null, icon: 'mdi-lock' , route: '/user_edit' },
				{ title: 'Einstellungen', subtitle: 'Website Einstellungen', icon: 'mdi-settings', route: '/options_edit' },
			],
			notification_items: [
				{ id:1, topic: 'Adressänderung', message: 'Mark Zürker hat seine Adresse geändert aadsf asdf asd ad asdfads fas dfad fasdf, Mark Zürker hat seine Adresse geändert aadsf asdf asd ad asdfads fas dfad fasdf', icon: 'mdi-home-edit', route: '/member_edit', timestamp:"vor 3 Minuten"},
				{ id:2, topic: 'Neues im Forum', message: 'Neuer Beitrag von Michale Reiche', icon: 'mdi-forum' , route: '/user_edit', timestamp:"vor 3 Tagen" },
				{ id:3, topic: 'Neue Bilder:', message: 'Manuel Brauchitsch hat neue Bilder hizugefügt', icon: 'mdi-image-plus', route: '/options_edit' , timestamp:"vor 3 Tagen"},
				{ id:4, topic: 'Neues im Forum', message: 'Karsten Messmer hat auf den Beitrag Weihnachtsessen 2019 geantwortet', icon: 'mdi-message-plus' , route: '/user_edit', timestamp:"vor 3 Tagen" },
				{ id:5, topic: 'Bevorstehende Veranstaltung', message: 'Am Fr. 22.12.2019. ist Weihnachtsessen', icon: 'mdi-calendar-star' , route: '/user_edit', timestamp:"vor 3 Tagen" },
				{ id:6, topic: 'Anstehender Geburtstag', message: 'Am 22.12.2019 wird Martin Schmitz 36 Jahre alt', icon: 'mdi-cake' , route: '/user_edit', timestamp:"vor 3 Tagen" },

			],
			
		}
	},
	methods: {
		login(){
			this.$router.push({name:'Login'})
		},
		logout(){
			firebase.auth().signOut().then(()=>{
				this.$router.push({name:'Login'})
			})
		}
	},
	created(){
		//let user = firebase.auth().currentUser
		firebase.auth().onAuthStateChanged((user)=>{
			if(user){
				//if true (not null) then user is logged in
				this.user=user
			} else {
				this.user=null
			}
		})
	}
 
}
</script>
<style>
.field {
	margin: 10px;
}
</style>

