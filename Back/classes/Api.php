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
    private $node_id            = [];
    private $language;
    private $search_keyword     = null;
    private $page_num           = 0;
    private $page_size          = 100;
    private $is_valid           = true;
    private $accepted_languages = [
        'english',
        'italian'
    ];

    /**
     * Api constructor.
     *
     * Se passa la validazione dei dati fa il setup delle proprietà della classe
     *
     * @param $request
     */
    public function __construct($request)
    {
        if($this->validate($request))
        {
            $this->node_id        = (int)$request['node_id'];
            $this->language       = $request['language'];
            $this->search_keyword = '%' . $request['search_keyword'] . '%';
            $this->page_num       = $request['page_num'];
            $this->page_size      = $request['page_size'];
        }
    }

    /**
     * Metodo per la logica di validazione dati
     *
     * @param $request - $_GET
     *
     * @return bool
     *
     * @since version 0.0.1
     */
    private function validate($request)
    {
        foreach($request as $param => $value)
        {
            switch($param)
            {
                case 'node_id':
                case 'page_num':
                case 'page_size':
                    $this->is_valid = (!ctype_digit($value)) ? false : true;
                    break;

                case 'language':
                    $this->is_valid = (!in_array($value, $this->accepted_languages)) ? false : true;
                    break;

                case 'search_keyword':
                    $this->is_valid = (!is_string($value)) ? false : true;
                    break;
            }

            if($this->is_valid === false)
            {
                break;
            }
        }

        return $this->is_valid;
    }

    /**
     * Metodo che si occupa di recuperare i dati richiesti
     *
     * @return string
     *
     * @since version 0.0.1
     */
    private function query()
    {
        $db = new Db;

        try
        {
            $stmt = $db->mysqli->prepare($this->buildQuery());

            if($stmt->bind_param("iss", $this->node_id, $this->language, $this->search_keyword))
            {
                $stmt->execute();

                $result = $stmt->get_result();

                // Chiudo le connessioni
                $stmt->close();
                $db->mysqli->close();

                // Controllo se ci sono records
                if($result->num_rows > 0)
                {
                    return json_encode($result->fetch_object());
                }

                else
                {
                    $response = [
                        'message' => 'Nessun dato presente per questa richiesta.'
                    ];

                    return json_encode($response);
                }
            }
        }

        catch(Exception $e)
        {
            $response = [
                'error' => $e->getMessage()
            ];

            return json_encode($response);
        }
    }

    /**
     * Metodo che si occupa di costruire l'SQL da far "preparare" a MySQLi
     *
     * @return string
     *
     * @since version 0.0.1
     */
    private function buildQuery()
    {
        $sql = 'SELECT nt.idNode, nodeName FROM node_tree_names ntn
                LEFT JOIN node_tree nt ON (nt.idNode = ntn.idNode)
                WHERE nt.idNode IN (?) && ntn.language = ?';

        if($this->search_keyword)
        {
            $sql .= ' AND ntn.nodeName LIKE ?';
        }

        if($this->page_num)
        {
            // page_num logic
            $sql .= '';
        }

        if($this->page_size)
        {
            // page_size logic
            $sql .= '';
        }

        return $sql;
    }

    /**
     * Metodo pubblico per chiamare l'API
     *
     * @return string
     *
     * @since version 0.0.1
     */
    public function results()
    {
        if($this->is_valid)
        {
            return $this->query();
        }

        else
        {
            $response = [
                'error' => 'invalid request data.'
            ];

            return json_encode($response);
        }
    }
}