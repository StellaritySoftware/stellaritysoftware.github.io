(function() {
  $(document).foundation();

  $(".image-link").magnificPopup({
    //mainClass: "mfp-fade"
    //removalDelay: 300
    type: "image"
  });

  $(".gallery").each(function() {
    var item, items;
    items = (function() {
      var i, len, ref, results;
      ref = $(this).find(".gallery-slides a");
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        results.push({
          src: $(item).attr("href"),
          title: $(item).attr("title"),
          type: "image"
        });
      }
      return results;
    }).call(this);
    return $(this).find(".gallery-link").magnificPopup({
      mainClass: "mfp-fade",
      removalDelay: 300,
      items: items,
      gallery: {
        enabled: true
      },
      callbacks: {
        open: function() {
          //- overwrite default prev + next function. Add timeout for css3 crossfade animation
          $.magnificPopup.instance.next = function() {
            var self;
            self = this;
            self.wrap.removeClass("mfp-image-loaded");
            return setTimeout((function() {
              return $.magnificPopup.proto.next.call(self);
            }), 150);
          };
          return $.magnificPopup.instance.prev = function() {
            var self;
            self = this;
            self.wrap.removeClass("mfp-image-loaded");
            return setTimeout((function() {
              return $.magnificPopup.proto.prev.call(self);
            }), 150);
          };
        },
        imageLoadComplete: function() {
          var self;
          self = this;
          return setTimeout((function() {
            return self.wrap.addClass("mfp-image-loaded");
          }), 30);
        }
      }
    });
  });

}).call(this);
