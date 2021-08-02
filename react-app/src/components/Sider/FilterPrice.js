import React, { useState } from 'react';

const listPrice = [
	{ lable: '≤ 1', value: '1' },
	{ lable: '$1 - 80', value: '1-80' },
	{ lable: '$80 - 160', value: '80-160' },
	{ lable: '$160 - 240', value: '160-240' },
	{ lable: '$240 - 1.820', value: '240-1820' },
	{ lable: '$1.820 - 3.400', value: '1820-3400' },
	{ lable: '$3.400 - 4.980', value: '3400-4980' },
	{ lable: '≥ $4.980', value: '4980' },
];

export default function FilterPrice() {
	const [index, setIndex] = useState(null);

	const handleSetActive = (i) => {
		if (i === index) {
			setIndex(null);
			return;
		}
		setIndex(i);
	};

	const showListFilterPrice = (listPrice) => {
		return listPrice.map((price, i) => {
			return (
				<div
					className={index === i ? 'price-item active' : 'price-item'}
					key={i}
					onClick={() => handleSetActive(i)}
					data-value={price.value}
				>
					{price.lable}
				</div>
			);
		});
	};
	return <div className='price-block'>{showListFilterPrice(listPrice)}</div>;
}
