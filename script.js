$(document).ready(function(){
  
  $(document).on('click', '.tp-start-time', function(){
    timePicker($(this));
  });
  
  $(document).on('click', '.tp-end-time', function(){
    startTime = $(this).closest('.tp-day-cont').find('.tp-start-time').html();
    timePicker($(this), 5, getHour(startTime));
  });
});

function timePicker($elem, minutesStep = 5, startHour = 0, startMinutes = 0, endHour = 23, endMinutes = 59, defaultTime)
{
  let currentHour = '12';
  let currentMinutes = '00';
  if(startHour < 0 || startHour > 23){
    startHour = 0;
  }
  if (endHour < startHour || endHour > 23){
    endHour = 23;
  }
  
  if (startMinutes < 0 || startMinutes > 59){
    startMinutes = 0;
  }
  if (endMinutes <= startMinutes || endMinutes > 59){
    endMinutes = 59;
  }
  
  if (minutesStep < 1 || minutesStep > 60){
    minutesStep = 5;
  }
  
  if (!defaultTime){
    let currentTime = $elem.html();
    if(isValidTime(currentTime)){
      currentHour = getHour(currentTime);
      currentMinutes = getMinutes(currentTime);
    }
  }
  let modal = '<div id="tp-modal" class="modal fade" tabindex="-1">' +
      '<div class="modal-dialog modal-sm">' +
        '<div class="modal-content">' +
          '<div class="modal-header"><h4>Set Time</h4></div>' +
          '<div class="modal-body pt-0 pl-0 pr-0 ">' +
            '<div id="tp-time-cont">' +
              '<div id="tp-hour-cont" class="mr-1 text-right">' +
                '<button id="tp-h-up" class="ml-auto"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
              '<path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>' +
                  '</svg></button>' +
                '<div id="tp-h-value" class="tp-value">12</div>' +
                '<button id="tp-h-down" class="ml-auto">' +
                  '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
              '<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>' +
                  '</svg>' +
                '</button>' +
              '</div>' +
              '<div id="tp-colon">:</div>' +
              '<div id="tp-minutes-cont" class="ml-1 text-left">' +
                '<button id="tp-m-up"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
              '<path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>' +
                  '</svg></button>' +
                '<div id="tp-m-value" class="tp-value">12</div>' +
                '<button id="tp-m-down">' +
                  '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
              '<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>' +
                  '</svg>' +
                '</button>' +
              '</div>' +
            '</div>' +
          '<div class="modal-footer">' +
            '<button type="button" id="tp-cancel-btn" class="btn btn-secondary" data-dismiss="modal">Cancel</button>' +
            '<button type="button" id="tp-set-btn" class="btn btn-primary">Set</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  $('body').append(modal);
  
  $('#tp-h-value').html(currentHour);
  $('#tp-m-value').html(currentMinutes);
  
  $('#tp-h-up').off('click').on('click', function(){
    let val = parseInt($('#tp-h-value').html()) + 1;
    if (val == endHour + 1){
      $('#tp-h-value').html(('0' + startHour).substr(-2));
    } else {
      $('#tp-h-value').html(('0' + val).substr(-2));
    }
  });
  
  $('#tp-h-down').off('click').on('click', function(){
    let val = parseInt($('#tp-h-value').html()) - 1;
    if (val == startHour - 1){
      $('#tp-h-value').html(('0' + endHour).substr(-2));
    } else {
      $('#tp-h-value').html(('0' + val).substr(-2));
    }
  });
  
  $('#tp-m-up').off('click').on('click', function(){
    let val = parseInt($('#tp-m-value').html()) + minutesStep;
    if (val >= endMinutes + 1){
      $('#tp-m-value').html((startMinutes == 0)? '00' : ('0' + (startMinutes + minutesStep - startMinutes % minutesStep)).substr(-2));
    } else {
      $('#tp-m-value').html(('0' + val).substr(-2));
    }
  });
  
  $('#tp-m-down').off('click').on('click', function(){
    let val = parseInt($('#tp-m-value').html()) - minutesStep;
    if (val <= startMinutes - 1){
      $('#tp-m-value').html(('0' + (endMinutes - endMinutes % minutesStep)).substr(-2));
    } else {
      $('#tp-m-value').html(('0' + val).substr(-2));
    }
  });
  
  $('#tp-set-btn').off('click').on('click', function(){
    let h = $('#tp-h-value').html();
    let m = $('#tp-m-value').html();
    
    $elem.html(h + ':' + m);
    
    if ($elem.hasClass('tp-start-time')){
      let $endTimeElem = $elem.closest('.tp-day-cont').find('.tp-end-time');
      if ($endTimeElem.length > 0){
        if (compareTimes($elem.html(), $endTimeElem.html()) == 0 || compareTimes($elem.html(), $endTimeElem.html()) == 1){
          $endTimeElem.html(newEndTime($elem.html(), minutesStep));
        }
      }
    } else {
      let $startTimeElem = $elem.closest('.tp-day-cont').find('.tp-start-time');
      if ($startTimeElem.length > 0){
        if (compareTimes($startTimeElem.html(), $elem.html()) == 0 || compareTimes($startTimeElem.html(), $elem.html()) == 1){
          $elem.html(newEndTime($startTimeElem.html(), minutesStep));
        }
      }
    }
    $('#tp-modal').modal('hide');
  });
  
  $('#tp-modal').modal('show');
}
  
function getHour(time){
  return time.substr(0, time.indexOf(':'));
}

function getIntHour(time){
  return parseInt(getHour(time));
}

function getMinutes(time){
  return time.substr(time.indexOf(':') + 1);
}

function getIntMinutes(time){
  return parseInt(getMinutes(time));
}

function isValidTime(time){
  let patt = /([01]?\d):([0-5]\d)/g;
  return patt.test(time);
}

function compareTimes(time1, time2){
  if (!isValidTime(time1) || !isValidTime(time2)) {
    return -1;
  }
  if (time1 == time2){
    return 0;
  } else if(getIntHour(time1) > getIntHour(time2)) {
    return 1;
  } else if(getIntHour(time1) == getIntHour(time2)) {
    if (getIntMinutes(time1) > getIntMinutes(time2)) {
      return 1;
    }
    else {
      return 2;
    }
  } else {
    return 2;
  }
}

function newEndTime(startTime, minutesStep){
  if (!isValidTime(startTime)){
    return -1;
  }
  
  let hour = getIntHour(startTime);
  let minutes = getIntMinutes(startTime);
  
  if (minutes + minutesStep > 59){
    minutes = 0;
    hour++;
    if (hour > 23){
      return startTime;
    }
  } else {
    minutes += minutesStep;
  }
  
  hour = ("0" + hour).substr(-2);
  minutes = ("0" + minutes).substr(-2);
  return hour + ":" + minutes;
}