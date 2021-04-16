import React, { useEffect } from 'react';
import * as d3 from 'd3';
import classnames from 'classnames';
import drawAxis from './axis';
import drawTooltip from './tooltip';

import './index.scss';

const BaseChart = (drawChart, extraProps) => {
  function Chart(props) {
    const svgRef = React.createRef();
    const tooltipRef = React.createRef();
    const { axisProps, data, svgProps, tooltipClass, scaleBandPadding, ...restProps } = props;
    const { useScaleBands, findHoverData } = extraProps;

    const { margin, width, height, svgContainerClass } = svgProps;

    const yMaxValue = d3.max(data, (d) => d.value);

    const xMinValue = d3.min(data, (d) => d.label);
    const xMaxValue = d3.max(data, (d) => d.label);

    let xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, width]);

    if (useScaleBands.x) {
      xScale = d3.scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.label))
        .padding(scaleBandPadding);
    }

    let yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, yMaxValue]);

    if (useScaleBands.y) {
      yScale = d3.scaleBand()
        .range([height, 0])
        .domain(data.map((d) => d.value))
        .padding(scaleBandPadding);
    }

    useEffect(() => {
      flushChart();
      draw();
    });

    function flushChart() {
      d3.select(svgRef.current).selectAll('*').remove();
    }

    function draw() {
      // eslint-disable-next-line no-unused-vars
      const svg = d3
        .select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .call(resize);

        function resize(svg) {
          // container will be the DOM element
          // that the svg is appended to
          // we then measure the container
          // and find its aspect ratio
          const container = d3.select(svg.node().parentNode),
              width = parseInt(svg.style('width'), 10),
              height = parseInt(svg.style('height'), 10),
              aspect = width / height;
         
          // set viewBox attribute to the initial size
          // control scaling with preserveAspectRatio
          // resize svg on inital page load
          svg.attr('viewBox', `0 0 ${width} ${height}`)
              .attr('preserveAspectRatio', 'xMinYMid')
              .call(resize);
         
          // add a listener so the chart will be resized
          // when the window resizes
          // multiple listeners for the same event type
          // requires a namespace, i.e., 'click.foo'
          // api docs: https://goo.gl/F3ZCFr
          d3.select(window).on(
              'resize.' + container.attr('id'), 
              resize
          );
         
          // this is the code that resizes the chart
          // it will be called on load
          // and in response to window resizes
          // gets the width of the container
          // and resizes the svg to fill it
          // while maintaining a consistent aspect ratio
          function resize() {
              const w = parseInt(container.style('width'));
              svg.attr('width', w);
              svg.attr('height', Math.round(w / aspect));
          }
        }
    
      drawAxis({
        ...axisProps,
        ...svgProps,
        ...extraProps,
        data,
        svgRef,
        xScale,
        yScale,
      });

      drawChart({
        svgRef,
        data,
        xScale,
        yScale,
        ...svgProps,
        ...restProps,
      });

      drawTooltip({
        useScaleBands,
        svgRef,
        tooltipRef,
        data,
        xScale,
        yScale,
        findHoverData,
        ...svgProps,
        ...restProps,
      });
    }

    return (
      <div className="base__container">
        <svg
          ref={svgRef}
          className={classnames('base__svg-container', svgContainerClass)}
        />
        <div className={classnames('base__tooltip', tooltipClass)} ref={tooltipRef} />
      </div>
    )
  }

  Chart.defaultProps = {
    scaleBandPadding: 0.05,
  }

  return Chart;
}
export default BaseChart;
