import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.scss']
})
export class LightsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function(){

      $('#default').on('click', function(){
        $('.light').attr('class', 'light');
        $('button').removeClass('active');
        $(this).addClass('active');
        setTimeout(function() {
         $('#light-1, #light-2, #light-3').attr('class', 'light strobe blue');
        $('#light-4, #light-5, #light-6').attr('class', 'light strobe red delay');
      }, 50);
      
      });
      
      $('#alt').on('click', function(){
        $('button').removeClass('active');
        $(this).addClass('active');
        $('.light').attr('class', 'light');
        setTimeout(function() {
          $('#light-1, #light-3, #light-5').attr('class', 'light strobe blue');
        $('#light-2, #light-4, #light-6').attr('class', 'light strobe red delay');
        }, 50);
        
      });
      
      $('#spotlight').on('click',function(){
        if( $('#default.active, #alt.active ,#off.active').length > 0 ){
          
          if( !$(this).is('.active') ) {
            $(this).addClass('active');
            $('#light-3, #light-4').attr('class', 'light');
            $('#light-3, #light-4').addClass('spotlight');
          } else if ( $(this).is('.active') && $('#default.active').length > 0 ){
            $(this).removeClass('active');
            $('.light').attr('class', 'light');
            setTimeout(function() {
              $('#light-1, #light-2, #light-3').attr('class', 'light strobe blue');
              $('#light-4, #light-5, #light-6').attr('class', 'light strobe red delay');
      }, 10);
          } else if ( $(this).is('.active') && $('#alt.active').length > 0 ){
            $(this).removeClass('active');
            $('.light').attr('class', 'light');
            setTimeout(function() {
              $('#light-1, #light-3, #light-5').attr('class', 'light strobe blue');
              $('#light-2, #light-4, #light-6').attr('class', 'light strobe red delay');
        }, 10);
          } else if ( $(this).is('.active') && $('#off.active').length > 0 ){
            $(this).removeClass('active');
            $('.light').attr('class', 'light');
          }
          
        } else {
          alert('Spotlight is not for use with "Traffic Warnings" because these light sequences are meant to simlulate the view from the rear of the vehicle. :(')
        }
      })
      
      $('#off').on('click', function(){
        $('button').removeClass('active');
        $(this).addClass('active');
        $('.light').attr('class', 'light');
      })
      
      $('#traffic-default').on('click', function(){
        $('button').removeClass('active');
        $(this).addClass('active');
        $('.light').attr('class', 'light');
        $('#light-1').attr('class', 'light strobe blue');
        $('#light-2, #light-3, #light-4, #light-5').attr('class', 'light warn on');
        $('#light-6').attr('class', 'light strobe red delay');
      })
      
      $('#caution').on('click', function(){
        $('button').removeClass('active');
        $(this).addClass('active');
        $('.light').attr('class', 'light caution');
      })
      
      $('#warn-left').on('click', function(){
        $('button').removeClass('active');
        $(this).addClass('active');
        $('.light').attr('class', 'light warn left');
      })
      
      $('#warn-right').on('click', function(){
        $('button').removeClass('active');
        $(this).addClass('active');
        $('.light').attr('class', 'light warn right');
      })
      
      
    });
  }

}
