<?php
/**
 * @package     Docebo
 * @subpackage
 *
 * @copyright   A copyright
 * @license     A "Slug" license name e.g. GPL2
 */

namespace Docebo;

use mysqli;

class Db
{
    public $mysqli;

    public function __construct()
    {
        $configs      = parse_ini_file('settings.ini');
        $this->mysqli = new mysqli($configs['DB_HOST'], $configs['DB_USER'], $configs['DB_PASS'], $configs['DB_NAME']) or die($this->mysqli->error);

        return $this->mysqli;
    }
}