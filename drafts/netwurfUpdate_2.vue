created(){
    let forumCollectionRef = db.collection('forum_topics')
    let memberCollectionRef = db.collection('members')
	forumCollectionRef.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				let thread = {}
				thread.id=doc.id
				thread.subject=doc.data().subject
				thread.created_date=doc.data().created_date.seconds
				thread.likes=1
				thread.replies=2
				//this.getHumanTimestamp(thread.created_date)
				console.log("step 1 topic",thread)
				memberCollectionRef.where("id", "==",doc.data().created_by).limit(1).get()
					.then(snapshot => {
						snapshot.forEach(doc => {
							console.log("step 2 user",thread)
							thread.created_by=doc.data().vorname + ' ' + doc.data().nachname
							storage.child('avatars').child(doc.data().avatar).getDownloadURL()
							.then(resp=>{
								thread.avatarURL=resp
								console.log("step 3 avatar")
							})
							.catch(err => {
								console.log("Error getting avatar",err)
							})
						})
					}).catch(err => {
						console.log("Error getting user data", err);
					})
				

				forumCollectionRef.doc(doc.id).collection("posts").orderBy("created_date").limit(1).get()
					.then(snapshot => {
						snapshot.forEach(doc => {
							console.log("step 4 post")
							thread.content=doc.data().content
						})
					}).catch(err => {
						console.log("Error getting sub-collection documents", err);
					})
				//console.log(thread)
				console.log("step 5 push")
				this.topics.push(thread)
				})
		}).catch(err => {
			console.log("Error getting documents", err);
		})
		console.log("step 6 done")
		console.log(this.topics)
    
  },