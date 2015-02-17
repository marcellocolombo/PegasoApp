angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('CategorieCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.categorie= [];

    $http({ method: 'GET', url: 'http://www.cartoleriapegaso.com/app/listaCategoria.php' }).
    success(function(data) {
    	data.forEach(function(entry) {    
            // Populate the object
            $scope.categorie.push({
            	"id"          : entry.id,
                "title"       : entry.nome,
                "foto"        : entry.foto,
                "colore"      : entry.colore
            });
        });
       
    })
    
}])
.controller("subCategoriaCtrl", function($scope, $http, $stateParams){
	 $scope.id = $stateParams.id;
	 $scope.title = $stateParams.title;
	 $scope.subCategorie= [];
	 $http({ method: 'GET', url: 'http://www.cartoleriapegaso.com/app/listaSubCategoria.php?padre='+$scope.id }).
     success(function(data) {
    	data.forEach(function(entry) {    
            // Populate the object
            $scope.subCategorie.push({
            	"id"    : entry.id,
                "title" : entry.nome,
                "descrizione" : entry.descrizione,
                "padre" : entry.padre,
                "foto"  : entry.foto
            });
        });
       
     })
})
.controller("elencoProdottiCtrl", function($scope, $http, $stateParams){
	 $scope.id = $stateParams.id;
	 $scope.title = $stateParams.title;
	 $scope.elencoProdotti= [];
	 $http({ method: 'GET', url: 'http://www.cartoleriapegaso.com/app/listaProdotti.php?categoria='+$scope.id }).
     success(function(data) {
    	data.forEach(function(entry) {    
            // Populate the object
            $scope.elencoProdotti.push({
            	"id" : entry.id,
                "nome" : entry.nome,
                "descrizione" : entry.descrizione,
                "foto" : entry.foto
            });
        });
       
     })
})
.controller("DettaglioCtrl", function($scope, $http, $stateParams){
	 $scope.id = $stateParams.id;
	 $http({ method: 'GET', url: 'http://www.cartoleriapegaso.com/app/dettaglioProdotto.php?prodotto='+$scope.id }).
     success(function(data) {
    	 $scope.nome = data[0].nome;
    	 $scope.foto = data[0].foto;
    	 $scope.descrizione = data[0].descrizione;
    	 $scope.srcImg = 'http://www.cartoleriapegaso.com/public/images/'+data[0].foto;
       
     })
     
     $scope.elencoImmagini= [];
     $http({ method: 'GET', url: 'http://www.cartoleriapegaso.com/app/elencoImmaginiProdotto.php?prodotto='+$scope.id }).
     success(function(data) {
    	data.forEach(function(entry) {    
            // Populate the object
            $scope.elencoImmagini.push({
            	"image" : entry.foto
            });
        });
       
     })
})

 

