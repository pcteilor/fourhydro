<?php
/** 
 * A configuração de base do WordPress
 *
 * Este ficheiro define os seguintes parâmetros: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, e ABSPATH. Pode obter mais informação
 * visitando {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} no Codex. As definições de MySQL são-lhe fornecidas pelo seu serviço de alojamento.
 *
 * Este ficheiro é usado para criar o script  wp-config.php, durante
 * a instalação, mas não tem que usar essa funcionalidade se não quiser. 
 * Salve este ficheiro como "wp-config.php" e preencha os valores.
 *
 * @package WordPress
 */

// ** Definições de MySQL - obtenha estes dados do seu serviço de alojamento** //
/** O nome da base de dados do WordPress */
define('DB_NAME', 'fourhydr_db');

/** O nome do utilizador de MySQL */
define('DB_USER', 'fourhydr_wp_user');

/** A password do utilizador de MySQL  */
define('DB_PASSWORD', 'fourhydr_pass');

/** O nome do serviddor de  MySQL  */
define('DB_HOST', 'localhost');

/** O "Database Charset" a usar na criação das tabelas. */
define('DB_CHARSET', 'utf8');

/** O "Database Collate type". Se tem dúvidas não mude. */
define('DB_COLLATE', '');

/**#@+
 * Chaves Únicas de Autenticação.
 *
 * Mude para frases únicas e diferentes!
 * Pode gerar frases automáticamente em {@link https://api.wordpress.org/secret-key/1.1/salt/ Serviço de chaves secretas de WordPress.org}
 * Pode mudar estes valores em qualquer altura para invalidar todos os cookies existentes o que terá como resultado obrigar todos os utilizadores a voltarem a fazer login
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '/qDYK|5F|Dh6tDlEK1d?KxWH* Y-yY[=5w _r.;+M&K^=F|d>RDwKQjSSOTJR+n2');
define('SECURE_AUTH_KEY',  ' L`Pk3Tfcd%%>^91VB9.WM<Es6g7%qoiwcL&_/+vPi,nlMQ/lt?Znh}oXklx~q,k');
define('LOGGED_IN_KEY',    'X8u!N@zZH/;|KVh`4ntwImf+#^Y$}Dj$zO-6_ ,U(vuFx3l7)M`oU>)V7S^C]O8F');
define('NONCE_KEY',        'iI.RF$Vm(_djSq%zNal<9jRlne5G*8;2wjj#P7}p2O3+IhI[p+myBNDE`n,&8~SM');
define('AUTH_SALT',        ')h|67i$2Wu42]M<xPPyIPQJ1KP-P*Sh8`G~L|Co+,0%~4aOdEM*TlZETLV3ha#Ze');
define('SECURE_AUTH_SALT', '?%J_vG},7HjNRekhi3&^w$hsY%VUByLa4y+-F}F+DWWa31R_*~K8d0y-t+m#okC0');
define('LOGGED_IN_SALT',   'qisb@Gu^#5f@Ty|CP#@Q{~W~>.z18+.3RYl0R;p$t^[JK9d? ,tF|0M]euwirnCY');
define('NONCE_SALT',       'P]O-kj *FUpf)/M3vp8W&.uJqhkn{`/B!5+dIT}CvS8!7I5>1D87eO!oE#%,jh`8');

/**#@-*/

/**
 * Prefixo das tabelas de WordPress.
 *
 * Pode suportar múltiplas instalações numa só base de dados, ao dar a cada
 * instalação um prefixo único. Só algarismos, letras e underscores, por favor!
 */
$table_prefix  = 'wp_';

/**
 * Idioma de Localização do WordPress, Inglês por omissão.
 *
 * Mude isto para localizar o WordPress. Um ficheiro MO correspondendo ao idioma
 * escolhido deverá existir na directoria wp-content/languages. Instale por exemplo
 * pt_PT.mo em wp-content/languages e defina WPLANG como 'pt_PT' para activar o
 * suporte para a língua portuguesa.
 */
define('WPLANG', 'pt_PT');

/**
 * Para developers: WordPress em modo debugging.
 *
 * Mude isto para true para mostrar avisos enquanto estiver a testar.
 * É vivamente recomendado aos autores de temas e plugins usarem WP_DEBUG
 * no seu ambiente de desenvolvimento.
 */
define('WP_DEBUG', false);

/* E é tudo. Pare de editar! */

/** Caminho absoluto para a pasta do WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Define as variáveis do WordPress e ficheiros a incluir. */
require_once(ABSPATH . 'wp-settings.php');
