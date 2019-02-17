<?php
/**
 * @package     Docebo
 * @subpackage
 *
 * @copyright   A copyright
 * @license     A "Slug" license name e.g. GPL2
 */

namespace Docebo;

class Api
{
    private $node_id = array();
    private $language;
    private $search_keyword;
    private $page_num = 0;
    private $page_size = 100;

    /**
     * Api constructor.
     * @param $request
     */
    public function __construct($request)
    {
        $this->node_id        = $request['node_id'];
        $this->language       = $request['language'];
        $this->search_keyword = $request['search_keyword'];
        $this->page_num       = $request['page_num'];
        $this->page_size      = $request['page_size'];
    }

    public function results()
    {
        return $this->query();
    }

    private function query()
    {
        $db = new Db;

        $result =  $db->mysqli->query($this->buildQuery());

        return json_encode($result->fetch_assoc());
    }



    private function buildQuery()
    {
        $sql = 'SELECT nt.idNode, nodeName FROM node_tree_names ntn
                LEFT JOIN node_tree nt ON (nt.idNode = ntn.idNode)
                WHERE nt.idNode IN (' . $this->node_id . ') && ntn.language = "italian"';

        return $sql;
    }
}