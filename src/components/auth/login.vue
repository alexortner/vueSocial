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
					>
						<v-icon slot="prepend" >mdi-account</v-icon>
					</v-text-field>

					<v-text-field
					v-model="password"
					:rules="passwordRules"
					label="Passwort"
					required
					type="password"

					>
						<v-icon slot="prepend" >mdi-lock</v-icon>
						<v-icon slot="append"  >mdi-eye-off</v-icon>
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