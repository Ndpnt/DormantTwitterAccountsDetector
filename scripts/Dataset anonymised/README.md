# Méthodologie de création du jeu de donnée

Entre le 26 et le 28 février 2019, 12 étudiants français de Sciences-Po Saint-Germain-en-Laye (niveau M1) ont annoté manuellement des comptes Twitters. Nous leur avons présenté un premier échantillon de 20 comptes Twitter représentant à la fois des comptes authentiques et non authentiques, en leur demandant de les classer en paires d'adverbes de certitude et de types authentiques / non authentiques (par exemple "certainement un bot", "probablement un humain"…). Chaque annotation a été annotée par des paires d'étudiants, puis revue par une autre paire indépendante. Des experts ont donné leur avis sur les 20 premières annotations, puis sur demande.

Nous avons ensuite demandé aux étudiants de choisir et de classer une centaine d'autres comptes, sans critères de sélection précis. Un algorithme exploratoire a ensuite été conçu et mis en œuvre, sélectionnant les comptes susceptibles d'être des robots selon les critères les plus performants identifiés par les classifieurs humains. Un sous-ensemble (312) de ces comptes a ensuite été classé manuellement, encore une fois par deux paires d'étudiants indépendants. Un sous-ensemble aléatoire (~ 80) de ces annotations a ensuite été examiné une autre fois par des experts en désinformation.

# Jeu de donnée

## Cluster dormants.csv

- Degré de confiance : Niveau de confiance sur le choix du type par le clasiffieur. Les valeurs possibles sont "sans aucun doute", "certainement", "probablement", "peut-être".
- Type : [Type de compte](type-de-comptes)
- Justification : Les raisons qui ont menées à ce choix de classification
- Action : Principales actions menée par le compte
- Stratégie : Stratégie supposée du compte
- But : But supposé du compte
- Score Botometer : Score de l'algorithme Botometer qui permet de déterminer la probabilité qu'un compte Twitter soit réellement humain ou de type robot
- Score Botometer vs annotation manuelle : Comparaison entre l'annotation manuelle et le score Botometer. Pour faciliter cette comparaison, les annotations manuelles ont été transformées en nombres selon le tableau suivant :

| Classification manuelle | Fourchette de pointage estimée du botomètre |
| ----------------------- | ------------------------------------------- |
| sans aucun doute inauthentique | 4,2-5 |
| certainement inauthentique | 3,8-4,2 |
| probablement inauthentique | 3,2-3,8 |
| peut-être l'un ou l'autre | 2-3,2 |
| probablement authentique | 1,4-2 |
| certainement authentique | 1-1,4 |
| sans aucun doute authentique | 0-1 |

- Encrypted screen name : Twitter handle crypté
- Encrypted ud id : Twitter userd Id crypté

## Twitter naïf.csv

- Degré de confiance : Niveau de confiance sur le choix du type par le clasiffieur. Les valeurs possibles sont "sans aucun doute", "certainement", "probablement", "peut-être".
- Type : [Type de compte](type-de-comptes)
- car : Justification du type de compte
- partage : Annotation sur le type de partage
- car : Justification sur le partage
- Niveau d'activité : Annotation du niveau d'activité selon la fréquence d'action sur la compte
- car : Justification du niveau d'activité
- Reach : Portée du compte, c'est à dire sa capacité à toucher des gens
- car : Justification du Reach
- Notes : Notes additionelles
- Compte de départ (compte abonné ayant permis de trouver ce compte)
- Score Botometer : Score de l'algorithme Botometer qui permet de déterminer la probabilité qu'un compte Twitter soit réellement humain ou de type robot
- Score Botometer vs annotation manuelle : Comparaison entre l'annotation manuelle et le score Botometer
- Encrypted screen name : Twitter handle crypté
- Encrypted ud id : Twitter userd Id crypté

# Définitions

## Type de comptes
- authentique : compte créé par une personne réelle, et dont l'identité affichée correspond probablement à l'identité réelle. Elle utilise le réseau pour s'informer, exprimer son opinion et/ou faire connaissance, communiquer avec d'autres utilisateurs. Un compte authentique peut avoir comme objectif de nuire/tenir des propos violents si la démarche est sincère.
- artificiel : compte dont l'identité affichée n'est pas celle du créateur du compte (usurpation d'identité) ou qui crée une identité vraisemblable (photo appartenant à un autre utilisateur). L'activité est déloyale et organisée par un individu / un groupe d'individus. L'objectif d'une grande partie de ces comptes est inconnue.
- pornographique : compte créé afin de diffuser ou obtenir des images pornographiques
- organisation : compte créé par une institution, une entreprise, une association, un collectif dans le but de présenter et/ou de fédérer ses membres
- fausse organisation : compte qui se présente de manière parodique ou trompeuse comme celui d'une organisation sans l'être
- privé : compte dont seuls les abonnés peuvent accéder au contenu
- suspendu : compte suspendu par Twitter

## Actions
- partage : retweets sur twitter
- publications : tweets
- mentions : @
- abonnements : following

## But
- clivant :cherche à susciter des réactions et diviser les utilisateurs, relaie des polémiques afin d'attiser la haine
- discrédit : cherche à discréditer une personnalité, un groupe ou une cause particulière
- promotion : cherche à donner de la visibilité à un produit, une marque, une personne

## Stratégies
- troll : publication de memes, de blagues visant à générer des polémiques, provocations intentionnelles & argumentation caricaturale
- support : soutient d'autres comptes et/ou cherche à gonfler le nombre d'abonnés d'autres comptes
- écrivain : publie des tweets, ne se contente pas de retweeter ;
 publie des réponses spontanées, cohérentes, en lien avec l'actualité
- dragueur : publie des photos suggestives et/ou d'hommes/femmes correspondant aux standards de beauté, ou alors il y a souvent des photos avec des enfants pour attendrir ou donner confiance; invite les abonnés à RT et à s'abonner, mentionne des personnes connues et/ou des personnes du sexe opposé

# Anonymisation

Les données sensibles, c'est à a dire celles permettant d'identifier précisément un compte, à savoir l'id et le nom d'utilisateur Twitter, ont été cryptées avec l'algorithme `bcrypt` afin d'éviter tout détournement du jeu de donnée.

Pour crypter ces données de manière telle que reconstituer la base prenne une durée suffisament longue qu'elle en deviennent rédibitoire nous nous sommes basé sur les informations suivantes.

Aujourd'hui, les identifiants Twitter sont stocké sur un espace entier de 64 bits non signés, ce qui représente 18446744073709551615 possibilités différentes.
Cependant, l'attribution de valeur dans cet espace n'est pas totalement aléatoire. En effet il semblerait qu'avant 2013, Twitter attribuait des identifiants simplement de manière séquentiel. Par exemple les identifiants de Jack Dorsey et Biz Stone (cofondateurs de Twitter) sont respectivement 12 et 13, et si on prends quelques exemples de comptes ayant été crée avant 2013 cela semble se confirmer. Pour deux comptes choisi aléatoirement durant cette période, le compte le plus ancien à toujours un identifiant plus faible.
Depuis 2013, [twitter à changé la manière de générer les identifiants](https://blog.twitter.com/developer/en_us/a/2013/64-bit-twitter-user-idpocalypse.html), ils sont maintenant basé sur le temps au lieu d'être séquentiels et ils sont composés d'un horodatage, d'un numéro de travailleur et d'un numéro de séquence.
Au moment de l'anonymisation, un compte fraichement créé était composé de 19 chiffres et nous pas n'avons trouvé de compte avec plus de chiffres. Nous avons donc fait la suposition qu'actuellement la valeur maximum théorique d'un identifiant Twitter soit 10e+19.
Le nombre théorique possible d'identifiants Twitters est donc 18446744073709551615 - 10e+19 = 8.4467441e+18
Nous avons choisi un algo bcrypt avec 10 passes qui permet aujourd'hui avec un processeur Intel Core i5 2,3 GHz de générer entre ~10 hashes par secondes, il faudrait donc plus de 1519152810 années pour reconsituter la base. Nous pouvons donc raisonnablement penser que même si les puissances de calculs évoluent beaucoup notre anonymisation devrait résister un moment.

# Contact

Si vous avez besoin du jeu de données non anonymisé à des fins de recherche, contactez marine.guillaume@diplomatie.gouv.fr.
