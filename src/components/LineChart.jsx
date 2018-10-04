import React from 'react';
import 'antd/dist/antd.css';
import DataSet from '@antv/data-set';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { Slider } from 'antd';

class CustomChart extends React.Component
{
    handleSliderChange()
    {
        console.log('Slider change'); 
        // This is where action creator should be called to update redux state, which will trigger a render of this component
    }
    
    render() {
        const { data, titleMap, height } = this.props;
        const ds = new DataSet( {
            state: {
              start: data[0].x,
              end: data[data.length - 1].x
            }
        } );
        const dv = ds.createView().source(data);
        const max = Math.max( ...data.map( ( datum ) => {
            const moment = Object.assign( {}, datum ); 
            delete moment.x;
            return Math.max( ...Object.keys( moment ).map( key => moment[key] ) );
        } ) );
        dv.transform({
          type: 'filter',
          callback: function callback(obj) {
            const date = obj.x;
            return date <= ds.state.end && date >= ds.state.start;
          }
        })
        .transform({
          type: 'map',
          callback: function callback(row) {
            const newRow = Object.assign({}, row);
            Object.keys( titleMap ).map( ( key ) => {
                newRow[titleMap[key]] = row[key]; 
            } );
            return newRow;
          }
        })
        .transform({
            type: 'fold',
            fields: Object.keys( titleMap ).map( ( key ) => titleMap[key] ),
            key: 'key',
            value: 'value'
        });
        const timeScale = {
          type: 'time',
          tickInterval: 60 * 60 * 100,
          mask: 'HH:mm',
          range: [0, 1]
        };

        const cols = {
          x: timeScale,
          value: {
            max: max,
            min: 0
          }
        };

        return (
            <div>
                 <Chart height={height} data={dv} scale={cols} forceFit>
                   <Axis name="x" />
                   <Tooltip crosshairs={{type : "y"}}/>
                   <Legend />
                   <Geom type="line" position="x*value" size={2} color={'key'} />
                 </Chart>
                <Slider min={ data[0].x } max={ data[data.length - 1].x } range defaultValue={ [0, data[data.length - 1].x] } onChange={this.handleSliderChange} />
            </div>
        );
    } 
}

export default CustomChart;
