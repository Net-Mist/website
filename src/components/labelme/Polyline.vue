<template>
    <svg width="640px" height="480px">
        <image id="my-image" :href="href" x="0" y="0" height="480px" width="640px"/>
    </svg>
</template>

<script>
    const d3 = require('d3');
    export default {
        name: 'Labelme',
        props: {
            href: String, // href of the image showing in the svg
            drawable: Boolean, // if true then update the points linked to drawable_name
            drawable_name: String, // name of the polygon we are editing
            visible: Boolean, // if true then display the polygons TODO change to dict to select each polygon
            polygon_names: Array // names of all the polygons we can edit
        },
        data() {
            return {
                points: []
            }
        },
        watch: {
            // when the component become drawable then clear the previous set of points and all the polygons
            drawable: function (new_state, old_state) {
                let vm = this;
                if (new_state && !old_state) {
                    vm.points[vm.drawable_name] = [];
                    let svg = d3.select('svg');
                    let g = svg.select("g");
                    g.selectAll('polygon').remove();
                }
            },
            visible: function (new_state, old_state) {
                let vm = this;
                console.log(vm.points);
                let svg = d3.select('svg');
                if (new_state) {
                    // draw
                    let g = svg.select("g");

                    for (let name of vm.polygon_names) {
                        console.log(name);
                        g.append('polygon')
                            .attr('points', vm.points[name])
                            .style('stroke', 'lime');
                    }


                } else {
                    let g = svg.select("g");
                    g.select('polyline').remove();
                    g.select('line').remove();
                    g.selectAll('polygon').remove();
                    g.selectAll('circle').remove();
                }

            }
        },
        mounted() {
            let vm = this;
            console.log(vm.polygon_names);
            // dict of list of point for each editable polygon
            for (let name of vm.polygon_names) {
                console.log(name);
                vm.points[name] = [];
            }

            console.log(vm.points);

            // d3 part see http://jsfiddle.net/eZQdE/43/
            document.getElementById('my-image').ondragstart = function () {
                return false;
            };

            let dragging = false, drawing = false, lastPoint;
            let svg = d3.select('svg');
            let g = svg.append("g");
            // let points = [];
            let transform = d3.zoomIdentity;


            svg.on('mousemove', function () {
                if (!vm.drawable)
                    return;
                if (!drawing) return;
                // let g = d3.select('g.drawPoly');
                g.select('line').remove();
                g.append('line')
                    .attr('x1', lastPoint[0])
                    .attr('y1', lastPoint[1])
                    .attr('x2', d3.mouse(this)[0] + 2)
                    .attr('y2', d3.mouse(this)[1])
                    .attr('stroke', '#53DBF3')
                    .attr('stroke-width', 1);
            });

            svg.on('mouseup', function () {
                if (!vm.drawable) {
                    return;
                }

                if (dragging)
                    return;
                if (!drawing && vm.points[vm.drawable_name].length !== 0)
                    return;
                drawing = true;
                lastPoint = [d3.mouse(this)[0], d3.mouse(this)[1]];

                if (d3.event.target.hasAttribute('is-handle')) {
                    closePolygon();
                    return;
                }

                // Add the new point in the list
                vm.points[vm.drawable_name].push(d3.mouse(this));

                // Update the polyline
                g.select('polyline').remove();
                g.append('polyline').attr('points', vm.points[vm.drawable_name])
                    .style('fill', 'none')
                    .attr('stroke', '#000');
                g.append('circle')
                    .attr('cx', lastPoint[0])
                    .attr('cy', lastPoint[1])
                    .attr('r', 4)
                    .attr('fill', 'yellow')
                    .attr('stroke', '#000')
                    .attr('is-handle', 'true')
                    .style({cursor: 'pointer'});

            });


            document.addEventListener('keydown', (event) => {
                const keyName = event.key;

                if (keyName === 'Escape') {
                    if (drawing)
                        closePolygon();
                    g.select('polyline').remove();
                    g.select('line').remove();
                    g.selectAll('circle').remove();
                    if (!vm.visible) {
                        g.select('polygon').remove();

                    }
                    vm.$emit("done", vm.points[vm.drawable_name])
                }
            }, false);

            function closePolygon() {
                // remove polyline and replace by polygone
                g.select('polyline').remove();
                g.select('line').remove();
                g.append('polygon')
                    .attr('points', vm.points[vm.drawable_name])
                    .style('stroke', 'lime');

                // make points dragable
                g.selectAll('circle').attr('r', 4)
                    .attr('fill', '#FDBC07')
                    .attr('stroke', '#000')
                    .attr('is-handle', 'true')
                    .call(d3.drag().on('drag', handleDrag));

                drawing = false;
            }


            function handleDrag() {
                if (drawing)
                    return;
                let newPoints = [], circle;
                dragging = true;
                let poly = d3.select(this.parentNode).select('polygon');
                let circles = d3.select(this.parentNode).selectAll('circle');

                d3.select(this)
                    .attr('cx', d3.event.x)
                    .attr('cy', d3.event.y);
                for (let i = 0; i < circles._groups[0].length; i++) {
                    circle = d3.select(circles._groups[0][i]);
                    newPoints.push([circle.attr('cx'), circle.attr('cy')]);
                }
                poly.attr('points', newPoints);
                vm.points[this.drawable_name] = newPoints;
            }

            function getRandomColor() {
                var letters = '0123456789ABCDEF'.split('');
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>