import React from 'react';

function Sort() {
	return (
		<div className='sort__container'>
			<span className='sort-infor'>123 results found in 123ms</span>
			<div className='sort-action'>
				<span className='mr-2'>Sort by</span>
				<select className='ais-sort-by-selector'>
					<option className='ais-sort-by-selector--item' value=''>
						Featured
					</option>
					<option className='ais-sort-by-selector--item' value='asc'>
						Price asc.
					</option>
					<option className='ais-sort-by-selector--item' value='desc'>
						Price desc.
					</option>
				</select>
			</div>
		</div>
	);
}

export default Sort;
