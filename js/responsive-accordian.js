(function ($) {
    $.accordian = function (el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;
        
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("accordian", base);
        
        base.init = function () {
            base.options = $.extend({}, $.accordian.defaultOptions, options);
            
            //Store our active class (remove the first character)
            base.active = $.accordian.defaultOptions.active.substring(1);
            
            //Hide all of our content
            base.$el.find($.accordian.defaultOptions.content).hide();
            
            //Attach event listeners            
            base.$el.find($.accordian.defaultOptions.header).click(function () {
              
                //Open the accordian
                base.open($(this).parent());
              
            });
        };
        
        base.open = function (el) {
          
            //If current element is active we need to close it
            if (el.hasClass(base.active)) {
              
                base.close(el);
              
            } else {
                    
                //If there is active content
                if (base.$active) {
                  
                    //Close the active content
                    base.close(base.$active);
                  
                }
                
                //Store the active element
                base.$active = el;
                
                //Add a classname for styling
                el.addClass(base.active);
                
                //Display the content
                el.find($.accordian.defaultOptions.content).slideDown("fast");
              
            }
          
        };
        
        base.close = function (el) {
          
            //Remove active class
            el.removeClass(base.active);
            
            //Hide content
            el.find($.accordian.defaultOptions.content).slideUp("fast");
       
        };
        
        // Run initializer
        base.init();
    };
    
    $.accordian.defaultOptions = {
        header: ".item-header",
        content: ".item-content",
        active: ".active"
    };
    
    $.fn.accordian = function (options) {
        return this.each(function () {
            (new $.accordian(this, options));
        });
    };
    
}(jQuery));