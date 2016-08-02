<?php
  // Set your return content type
  header('Content-type: application/xml');  

  $webServicesId = 'X1-ZWz19u0t23l4i3_a6mew';
  if (!empty($_GET['address'])) {
    $address = preg_replace("/ /","+", $_GET['address']);
  }
  if (!empty($_GET['city'])) {
    $city = preg_replace("/ /","+", $_GET['city']);  
  }

  if (!empty($_GET['state'])) {
    $state = $_GET['state'];
  }

  if (!empty($_GET['zip'])) {
    $zip = $_GET['zip'];
  }

  // Set empty string.
  $citystatezip = '';

  // If City & State are passed..
  if (isset($city, $state)) {
    $citystatezip .= $city;
    $citystatezip .= '%2c+';
    $citystatezip .= $state;

    //If zip is also present, append.
    if(isset($zip)) {
      $citystatezip .= '+';
      $citystatezip .= $zip;
    }
  }
  // If no City or State, but zip, set to zip.
  if (!isset($city, $state) && isset($zip)) {
    $citystatezip = $zip;
  }

  //If just city or state, won't pass due to $citystatezip being and empty string.
  if ($address && $citystatezip) {
    
    /** Build URL to Open
     * searchApi: 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?
     * Format: http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=<zws-id>&address=<address>&citystatezip=<city, state zip>
     * Example: http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz19u0t23l4i3_a6mew&address=914+Warsaw+St&citystatezip=Seattle%2C+WA
     */
    $url = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?';
    $url .= 'zws-id=' . $webServicesId;
    $url .= '&address=' . $address;
    $url .= '&citystatezip=' . $citystatezip;
    
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
  } else {
    echo '<p> address OR citystatezip is NOT set.</p>';
    echo '<p> Address:' . $address . '</p>';
    echo '<p> citystatezip' . $citystatezip . '</p>';
  }

?>