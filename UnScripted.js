$(function()
  {    
    $('#month').change(function(){      
      $('tbody').empty()      
      init()      
    })
    $('#oap').change(function(){
      if(this.checked){
        $('#navoap').show();
      }
      else{
        $('#navoap').hide();
      }
    })
  //})
    //https://docs.google.com/spreadsheets/d/1w6KmFxXb3qkXM1n7Eyq272NJkvpUlK-aDFdT4_DAxEE/edit?usp=sharing
    //https://docs.google.com/spreadsheets/d/e/2PACX-1vQLKBVlZtsC0V6bXEURcgRO31qRHDofwR1zrfu3r4plJtKM5g1FKHDkGD3NHRchsXuejzAvESgcaK42/pubhtml
    var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1pCFUZL_WIiT6-a7UHk0V-MEVLgCX6YuVtiMgPjOvdso/pubhtml';
    //Live
    //https://docs.google.com/spreadsheets/d/e/2PACX-1vSdhf90qNqYGAOXHSWdv-nOryHRXp4P6YNk2ny9cY8Wv00dr3K4rnCm-JjIbC56jymc7Q_uZfE2Nenw/pubhtml
    //https://docs.google.com/spreadsheets/d/1pCFUZL_WIiT6-a7UHk0V-MEVLgCX6YuVtiMgPjOvdso/edit?usp=sharing
  
    function init() {        
      Tabletop.init( { key: publicSpreadsheetUrl,        
                       callback: showInfo,                       
                       simpleSheet: true                    
                        })
    }
    function showInfo(data, tabletop) {      
      //alert('Successfully processed!')      
      var fdata = data.filter(function(entry){
        return entry.Month === $('#month').val()
      })
      var cdata = fdata.filter(function(entry){
        return entry.Remark === 'D'
      })      
      var wdata = fdata.filter(function(entry){
        return entry.Remark === 'W'
      })
      var tr;      
    for (var i = 0; i < cdata.length; i++) {
      tr = $('<tr/>');    
      tr.append("<td>" + cdata[i].Section + "</td>");
      tr.append("<td>" + cdata[i].Task + "</td>");
      tr.append("<td>" + cdata[i].AssignedTo + "</td>");
      tr.append("<td>" + cdata[i].DoneBy + "</td>");                  
      $('#c').append(tr);
    }
    for (var i = 0; i < wdata.length; i++) {
      tr = $('<tr/>');    
      tr.append("<td>" + wdata[i].Section + "</td>");
      tr.append("<td>" + wdata[i].Task + "</td>");
      tr.append("<td>" + wdata[i].AssignedTo + "</td>");                       
      $('#w').append(tr);
    }
    }
    window.addEventListener('DOMContentLoaded', init)    
})