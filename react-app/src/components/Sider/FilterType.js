import React from 'react';

const mockData = [
	{
		type: 'Trend cases(457)',
		checked: false,
	},
	{
		type: 'Ult protection cases(393)',
		checked: false,
	},
	{
		type: 'Ink cartridges(249)',
		checked: false,
	},
	{
		type: 'Business cases(217)',
		checked: false,
	},
	{
		type: 'Connectivity(181)',
		checked: true,
	},
];

function FilterType() {
	const mapListType = (data) => {
		return data.map((dataItem, index) => {
			return (
				<div className='block-type__list' key={index}>
					<input
						className='mr-2'
						type='checkbox'
						defaultChecked={dataItem.checked}
					/>
					{dataItem.type}
				</div>
			);
		});
	};
	return <div className='block-type'>{mapListType(mockData)}</div>;
}

export default FilterType;
