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
      var pdata = fdata.filter(function(entry){
        return entry.Remark === 'P' || entry.Remark == ''
      })
      var apdata = data.filter(function(entry){
        return entry.Remark === 'P' || entry.Remark == ''
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
    for (var i = 0; i < pdata.length; i++) {
      tr = $('<tr/>');    
      tr.append("<td>" + pdata[i].Section + "</td>");
      tr.append("<td>" + pdata[i].Task + "</td>");
      tr.append("<td>" + pdata[i].AssignedTo + "</td>");                       
      $('#p').append(tr);
    }
    for (var i = 0; i < apdata.length; i++) {
      tr = $('<tr/>');    
      tr.append("<td>" + apdata[i].Section + "</td>");
      tr.append("<td>" + apdata[i].Task + "</td>");
      tr.append("<td>" + apdata[i].Month + "</td>");
      tr.append("<td>" + apdata[i].AssignedTo + "</td>");                       
      $('#ap').append(tr);
    }
    var dict = {
      Jan : 'Feb', Feb : 'Mar', Mar : 'Apr', Apr : 'May', May : 'Jun', Jun : 'Jul', Jul : 'Aug', Aug : 'Sep', Sep : 'Oct', Oct : 'Nov', Nov : 'Dec', Dec : 12
    };
    if ($('#month').val() != 'Dec')
    {
      var up = dict[$('#month').val()]              
      $('span').empty()
      $('span').append(up)  
      var udata = data.filter(function(entry){
        return entry.Month == up && entry.Remark == ''
      })                
      for (var i = 0; i < udata.length; i++) {
        tr = $('<tr/>');    
        tr.append("<td>" + udata[i].Section + "</td>");
        tr.append("<td>" + udata[i].Task + "</td>");        
        tr.append("<td>" + udata[i].AssignedTo + "</td>");                       
        $('#u').append(tr);
      }
    }
    }
    window.addEventListener('DOMContentLoaded', init)    
})