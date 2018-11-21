/*
Déclaration des variables
*/
    let homeButton = document.querySelector('nav li:nth-child(1) a');   // Ca affiche dans la console la balise Accueil
    let myNav = document.querySelectorAll('nav a'); // Mais ça c mieux c'est 1 seule variable qui affiche tous les boutons
    console.log(homeButton)   
    console.log(myNav)
//



/*
Activer la navigation
*/
    // Faire une boucle sur myNav (collection de liens)
    for( let item of myNav ){
        // Item => lien de la nav
        console.log(item);

        // Capter le clic sur le lien :
        item.addEventListener( 'click', (event) => {  // ici ça bloque le comportement naturel de la balise
            event.preventDefault();
            

        //Récupérer la valeur de l'attribut link data :
        const pageName = item.getAttribute('link-data')


        //AJouter le contenu dans le DOM:
        fetchHtmlData(pageName)
        });

        
    };
//


/*
Création d'une fonction Fetch
*/

    const fetchHtmlData = (page = 'contacts') => {
        /*
        Requête asynchrone sur un fichier HTML:
        */
        fetch(`./content/${page}.html`) // Premier callback : analyse et traitement du fetch

        .then( rawReponse =>{

        return rawReponse.text() //Renvoyer la réponse au format texte
        })

        .then( textResponse =>{   // 2eme callback : manipuler les données et les afficher en texte
        document.querySelector('main').innerHTML = textResponse
        //Envoyer le nom de la page dans le dernier then
        return page

         })

         .then( page => {
            console.log(page)
        
        //Verifier le nom de la page active
        if( page === 'contacts' ) submitForm()
        
        })

        .catch( error =>{
        console.error(error) // Capter les erreurs
        })

        } 

//

/*
Gestion du formulaire
*/
        const submitForm = ()=> {
            //Déclaration des variables
            let myForm = document.querySelector('form');
            let msgSubject = document.querySelector('[placeholder="Sujet"]');
            let msgEmail = document.querySelector('[placeholder="Email"]');
            let msgMessage = document.querySelector('[placeholder="Votre message"]');
            let messageList = document.querySelector('form + ul')

            //Capter le submit du formulaire
            myForm.addEventListener('submit', (event) =>{
                //Initier une variable pour la gestion des erreurs
                let formError = 0;


                //bloquer le comportement naturel de la balise
                event.preventDefault();
                console.log('submit')


            

            // Le sujet est valide si il contient min 2 caractères :
            if(msgSubject.value.length < 2){
                //Incrémenter formError de 1
                formError++

                //Ajouter la classe formError sur msgSubject
                msgSubject.classList.add('formError')
            }


            // L'email est valide si il contient min 5 caractères :
            if(msgEmail.value.length < 5){
                //Incrémenter formError de 1
                formError++  
                //Ajouter la classe formError sur msgEmail
                msgEmail.classList.add('formError')          
            }
            


            // Le message est valide si il contient min 5 caractères :
            if(msgMessage.value.length < 5){
                //Incrémenter formError de 1
                formError++
                //Ajouter la classe formError sur msgMessage
                msgMessage.classList.add('formError')
            }
            

            //Validation finale du formulaire : 
            if (formError === 0){
                console.log('Le formulaire est validé !');


                //Afficher le message dans la liste:
                messageList.innerHTML += `
                    <li>
                       <h3>${msgSubject.value} <b>${msgEmail.value} </h3> 
                       <p>${msgMessage.value}</p>
                    </li>
                `

            
                //Vider le formulaire
                msgEmail.value = ''
                msgMessage.value = ''
                msgSubject.value = ''
            }
        

                //Supprimer les messages d'erreur au focus
                msgSubject.addEventListener('focus', () => {
                    msgSubject.classList.remove('formError')
                })

                msgEmail.addEventListener('focus', () => {
                    msgEmail.classList.remove('formError')
                })

                msgMessage.addEventListener('focus', () => {
                    msgMessage.classList.remove('formError')
                })


            console.log(msgSubject.value.length)  // Le .value récupère la valeur écrite dans le sujet et l'affiche dans la console et le .length affiche le nombre de caractère
            })
        }




/* 
Charger le contenu de la page d'accueil
*/

fetchHtmlData()

//