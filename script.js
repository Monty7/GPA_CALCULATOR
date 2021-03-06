(function($){
    var $allQualityPoints = $('td.allPoints');
    $allQualityPoints.text(parseFloat(0));
    var $allCredits = $('input[name="credit"], select[name="credit"]');
    
    $('table').on('change', 'select[name="gpa"], select[name="grade"], select[name="credit"]', totalCreditsAndQualityPoints)
    $('table').on('keyup', 'input[name="gpa"], input[name="credit"]', totalCreditsAndQualityPoints)
    //totalCreditsAndQualityPoints for calculation of columns
    function totalCreditsAndQualityPoints(e){
      
      var credit = parseFloat($(e.currentTarget).parent('td').parent('tr').find('input[name="credit"], select[name="credit"] option:selected').val());
      var gpa = $(e.currentTarget).parent('td').parent('tr').find('input[name="gpa"]').val();
      var grade = $(e.currentTarget).parent('td').parent('tr').find('input[name="grade"], select[name="grade"]').val(); 
      
       if($('input[name="gpa"]')){ //calculate GPA
         var qualityPointsFirstRowTotal = totalQualityPointsPerRow(parseFloat(gpa, 10), credit); 
         $(e.currentTarget).parent('td').parent('tr').find('#qualityPointsFirstRow').text(qualityPointsFirstRowTotal);
    
       }
       if($('select[name="grade"]')){ //calculate Grade
         var qualityPointsPerRowTotal = totalQualityPointsPerRow(parseFloat(computeGradeNum(grade), 10), parseFloat(credit, 10));
         $(e.currentTarget).parent('td').parent('tr').find('#qualityPoints').text(qualityPointsPerRowTotal);
     
       }
     
       var totalAllCredits = 0;
       var totalAllQualityPoints = 0;
    
       totalAllQualityPoints = calculatePoints($allQualityPoints, totalAllQualityPoints);
       totalAllCredits = calculateCredits($allCredits, totalAllCredits);
    
       $('#newCumulativeCredits').text(totalAllCredits);  
       $('#newCumulativeQualityPoints').text(totalAllQualityPoints);
    
       overallGPA();
    }

    function calculatePoints($pointsArr, total){
      $pointsArr.each(function(index, value){// looping through all quality points
          value = parseFloat($(value).text());
          
          total += value || 0; //adding all quality points
      });
      return total;
    }

    function calculateCredits($creditsArr, total){
      $creditsArr.each(function(index, value){// looping through all credits
        
          value = parseInt($(value).val());
          total += value || 0; 
          
        })

      return total;
    }

    
    //Quality points for calculation of rows
    function totalQualityPointsPerRow(gpaOrLetGrade, credits) {
      var result = credits * gpaOrLetGrade || 0;  //defaults to zero if NaN
      return result.toFixed(2);
    }

    function overallGPA(){  //GPA calculated
      var overallCredits = parseFloat($('#newCumulativeCredits').text(), 10);
      var overallPoints = parseFloat($('#newCumulativeQualityPoints').text(), 10);
      var overall =  overallPoints / overallCredits || 0;
      $('#newCumulativeGpa').text(overall.toFixed(2));
    }

    function computeGradeNum(input){ //Grade to point value system
      var gradenum = 0;
      var thegrade = input;
      if (thegrade === "A" || thegrade === "a") {gradenum = 4;}
      else if (thegrade === "B") {gradenum = 3;}
      else if (thegrade === "C") {gradenum = 2;}
      else if (thegrade === "D") {gradenum = 1;}
      else if (thegrade === "B+") {gradenum = 3.3;}
      else if (thegrade === "C+") {gradenum = 2.3;}
      else if (thegrade === "D+") {gradenum = 1.3;}
      else if (thegrade === "A-") {gradenum = 3.7;}
      else if (thegrade === "B-") {gradenum = 2.7;}
      else if (thegrade === "C-") {gradenum = 1.7;}
      else if (thegrade === "D-") {gradenum = .7;}
      else if (thegrade === "E") {gradenum = 0;}
      
      return gradenum;
         }
    
    })(jQuery);