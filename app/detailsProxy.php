<?php
  // Set your return content type
  header('Content-type: application/xml');

  // Requires zpid
  if (!empty($_GET['zpid'])) {
    
    // Get variables.
    $zpid = $_GET['zpid'];
    $webServicesId = 'X1-ZWz19u0t23l4i3_a6mew';

    /** Build URL to Open
     * propertyDetailsApi: 'http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?
     * Format: http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=<zws-id>&zpid=<zpid>
     * Example: http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=X1-ZWz19u0t23l4i3_a6mew&zpid=48768108
     */
    $url = 'http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?';
    $url .= 'zws-id=' . $webServicesId;
    $url .= '&zpid=' . $zpid;

    // Get that website's content
    $handle = fopen($url, 'r');

    // If there is something, read and return
    if ($handle) {
      while (!feof($handle)) {
        $buffer = fgets($handle, 4096);
        echo $buffer; 
      }
       fclose($handle);
    }    
  }

?>