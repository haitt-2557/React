import { Divider } from 'antd';
import React from 'react';

import ButtonClear from './ButtonClear';
import FilterBrand from './FilterBrand';
import FilterPrice from './FilterPrice';
import FilterRating from './FilterRating';
import FilterType from './FilterType';
import ShowResultFor from './ShowResultFor';
import './style.scss';

export default function SideBar() {
	return (
		<aside id='sidebar'>
			<ButtonClear />
			<h3 className='show-result'>Show result for</h3>
			<ShowResultFor />
			<Divider />
			<h3 className='show-result'>Refine by</h3>
			<h4 className='title-filter fw-7'>Type</h4>
			<FilterType />
			<h4 className='title-filter fw-7'>Brand</h4>
			<FilterBrand />
			<h4 className='title-filter fw-7'>Ratings</h4>
			<FilterRating />
			<h4 className='title-filter fw-7'>Prices</h4>
			<FilterPrice />
			<Divider />
		</aside>
	);
}
