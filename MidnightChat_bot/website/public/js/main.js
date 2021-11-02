 
  var editor; // use a global for the submit and return data rendering in the examples
 
  $(document).ready(function() {
      editor = new $.fn.dataTable.Editor( {
          ajax: "../php/join.php",
          table: "#example",
          fields: [ {
                  label: "First name:",
                  name: "users.first_name"
              }, {
                  label: "Last name:",
                  name: "users.last_name"
              }, {
                  label: "Phone #:",
                  name: "users.phone"
              }, {
                  label: "Site:",
                  name: "users.site",
                  type: "select",
                  placeholder: "Select a location"
              }
          ]
      } );
   
      $('#example').DataTable( {
          dom: "Bfrtip",
          ajax: {
              url: "../php/join.php",
              type: 'POST'
          },
          columns: [
              { data: "users.first_name" },
              { data: "users.last_name" },
              { data: "users.phone" },
              { data: "sites.name" }
          ],
          select: true,
          buttons: [
              { extend: "create", editor: editor },
              { extend: "edit",   editor: editor },
              { extend: "remove", editor: editor }
          ]
      } );
  } );