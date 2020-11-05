<?php

class toInstall{

    static function createStructure(){

        $a = new ffStructure();

        $a->startSection( 'install', 'Install');
            $a->addElement(ffOptEnv::HEADER, 'Required plugins');

            $a->addElement(ffOptEnv::PLUGIN_INFO, 'Contact Form 7')
                ->addParam('path', 'contact-form-7/wp-contact-form-7.php');

            $a->addElement(ffOptEnv::PLUGIN_INFO, 'Really Simple CAPTCHA')
                ->addParam('path', 'really-simple-captcha/really-simple-captcha.php');

            $a->addElement(ffOptEnv::PLUGIN_INFO, 'Revolution Slider')
                ->addParam('path', 'revslider/revslider.php');

            $a->addElement(ffOptEnv::PLUGIN_INFO, 'All required plugins installed')
                ->addParam('path', array(
                      'contact-form-7/wp-contact-form-7.php',
                      'really-simple-captcha/really-simple-captcha.php',
                      'revslider/revslider.php',
                ));

            $a->addElement(ffOptEnv::BUTTON, 'Re-run Basic Installation')
                ->addParam('link', './admin.php?page=ff_options&ff_install=basic&install-action=1#install')
                ->addParam('class', 'install_link');

            if( ffOpt::GetDBDirect('fullthemeinstall', 'final_check') ){
                  $a->addElement(ffOptEnv::HEADER, 'Full demo installation');
                  $a->addElement(ffOptEnv::DESCRIPTION, 'Demo content is installed');
            }else{
                  $a->addElement(ffOptEnv::HEADER, 'Warning');

                  $a->addElement(ffOptEnv::DESCRIPTION,
                      'The Full Installation is meant for <strong>EMPTY SITES ONLY</strong> because it can overwrite/delete your existing content or settings. There is no going back after you install it.'.
                      '<br /><br />'.
                      'But if you are an experienced developer and are absolutely sure that you want to install the Full Installation over an existing site for whatever reason, then we suggest you to <strong>BACKUP</strong> your MySQL database before running the Full Installation.'.
                      '<br /><br />'.
                      'NOTE: We cannot be held responsible for any data loss or problems resulting from installing the Full Installation over an existing site.'
                  )->addParam('class', 'warning');

                  $a->addElement(ffOptEnv::HEADER, 'Full demo installation');

                  $a->addElement(ffOptEnv::BUTTON, 'Install full demo content installation')
                      ->addParam('link', './admin.php?page=ff_options&ff_install=full-demo-content');
            }
            
        $a->endSection();

        return $a;

    }

}
