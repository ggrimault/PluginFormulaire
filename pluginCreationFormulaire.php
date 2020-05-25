<?php
/*
Plugin Name: pluginCreationFormulaire
Description: Il s'agit d'un plugin servant a créer un formulaire
Author: Guillaume GRIMAULT, Esteban GUTIERREZ
Version: 1.0
*/

function fenetre_admin() {
		add_menu_page(
			'Plugin creation forumlaire',
			'Plugin creation forumlaire',
			'manage_options',
			'main-menu',
			'my_admin_page_contents',
			'dashicons-schedule',
			3
		);

    add_submenu_page(
      'main-menu',
      'Liste des formulaires',
      'Liste des formulaires créés',
      'manage_options',
      'list-form',
      'my_admin_listeFormulaire_contents'
    );

    add_submenu_page(
      'main-menu',
      'Création de formulaire',
      'Création de formulaire',
      'manage_options',
      'create-form',
      'my_admin_createFrom_contents'
    );
	}

	add_action( 'admin_menu', 'fenetre_admin' );


	function my_admin_page_contents() {
		?>
			<h1>
				Page d'aministration du plugin de création de formulaire
			</h1>
		<?php
	}
  function my_admin_listeFormulaire_contents() {
		?>
			<h1>
				Liste des formulaires créés
			</h1>
		<?php
	}

  function my_admin_createFrom_contents() {
		include("pluginFormulaire.html");
	}
 ?>
