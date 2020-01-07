<template>
	<div class="login container">
		<v-card>
			<v-card-title class="headline">Login</v-card-title>
			<v-card-text>
				<v-form
					ref="form"
					v-model="valid"
					lazy-validation
					class="px-3"
					>
					<v-text-field
						v-model="email"
						:rules="emailRules"
						label="E-mail"
						name="email"
						required
						prepend-icon="mdi-account"
					>
					</v-text-field>

					<v-text-field
						v-model="password"
						:rules="passwordRules"
						label="Passwort"
						required
						error-message="feedback"
						message="test"
						:type="showPassword ? 'txt' :'password'"
						prepend-icon="mdi-lock"
						:append-icon="showPassword? 'mdi-eye' :'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
					>
					</v-text-field>

					<v-btn class="mt-12" block @click="login">Login</v-btn>

					<p class="mx-8 mt-8 red--text" v-if="feedback">{{feedback}}</p>

				</v-form>
			</v-card-text>
		</v-card>
	</div>
</template>
<script>
import firebase from '@/firebase/init'

export default{
	name: 'Login',
	data(){
		return{
			valid: '',
			email: '',
			emailRules: [
				v => !!v || 'Bitte E-mail eingeben',
				v => /.+@.+\..+/.test(v) || 'Bitte gültige E-mail eingeben',
			],
			password: null,
			passwordRules: [
				v => !!v || 'Bitte Passwort eingeben',
			],
			showPassword: false,
			feedback: null
		}
	},
	methods:{
		login(){
			if(this.email && this.password){
				this.feedback=null
				firebase.auth().signInWithEmailAndPassword(this.email,this.password)
				.then(() => {
					this.$router.push({name: 'Members'})

				}).
				catch(err => {
					this.feedback=err
				})

			} else {
				this.feedback="Bitte Email und Passwort eingeben"
			}
		}
	}
	
}
</script>
<style>
.login{
	max-width: 400px;
	margin-top: 60px;
}	
</style>