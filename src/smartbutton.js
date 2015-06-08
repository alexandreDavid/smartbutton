(function($) {
    $.fn.smartbutton = function(data, options) {
        var $this = this,
            W = $this.width(),
            H = $this.height(),
            centerX = W/2,
            centerY = H/2,
            cos = Math.cos,
            sin = Math.sin,
            PI = Math.PI;
        var div = $this[0];
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('width', W);
        svg.setAttribute('height', H);
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        svg.setAttribute('class', 'smartbutton');
        div.appendChild(svg);
        drawPieSegments();
        var midPart = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        midPart.setAttribute("cx", centerX);
        midPart.setAttribute("cy", centerY);
        midPart.setAttribute("r", Min([H/2,W/2])*0.8);
        midPart.setAttribute("fill", "black");
        midPart.setAttribute("class", "smartbutton-center");
        svg.appendChild(midPart);
        var mouseup = false;
        $(svg).mousedown(function() {
            mouseup = true;
            midPart.setAttribute("class", "smartbutton-center-mouseup");
        }).mouseleave(function() {
            midPart.setAttribute("class", "smartbutton-center");
            midPart.setAttribute("fill", "black");
        });
        $(document).mouseup(function() {
            if (mouseup) {
                midPart.setAttribute("class", "smartbutton-center");
                mouseup = false;
            }
        });
        $('.smartbutton-segment').mouseover(function() {
            midPart.setAttribute('fill', this.getAttribute('fill'));
        });
    
        function drawPieSegments (animationDecimal) {
          var startRadius = 0;
          //draw each path
          var nbSeg = data.length,
              segmentAngle = (PI*2)/nbSeg,
              pieRadius = Min([H/2,W/2]),
              startRadius = -segmentAngle/2-PI/2;
          for (var i = 0; i < nbSeg; i++){
            var endRadius = startRadius + segmentAngle,
                largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
                startX = centerX + cos(startRadius) * pieRadius,
                startY = centerY + sin(startRadius) * pieRadius,
                endX = centerX + cos(endRadius) * pieRadius,
                endY = centerY + sin(endRadius) * pieRadius;
            var cmd = [
              'M', startX, startY,
              'A', pieRadius, pieRadius, 0, largeArc, 1, endX, endY,
              'L', centerX, centerY,
              'Z'
            ];
            var segment = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            segment.setAttribute("d", cmd.join(' '));
            segment.setAttribute('fill', data[i].color);
            segment.setAttribute("class", "smartbutton-segment");
            svg.appendChild(segment);
            startRadius += segmentAngle;
          }
        }
    }
    function Min(arr){
    return Math.min.apply(null, arr);
  }
})(jQuery);