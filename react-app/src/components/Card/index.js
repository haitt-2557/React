import React from 'react';
import { Col } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';

import './style.scss';

export const showRating = (rating) => {
	const template = [];
	let i = 1;
	while (i <= 5) {
		if (i <= rating) {
			template.push(<StarFilled className='is-rating' key={i} />);
		} else template.push(<StarOutlined className='is-rating' key={i} />);
		i++;
	}
	return template;
};

function Card() {
	return (
		<Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
			<article className='card'>
				<img
					className='card__img'
					src='https://cdn-demo.algolia.com/bestbuy-0118/5588602_sb.jpg'
					alt='https://cdn-demo.algolia.com/bestbuy/1696302_sc.jpg'
				/>
				<span className='card__name mt-2'>
					Dell - Inspiron 15.6" Touch-Screen Laptop - Intel Core i5 - 6GB Memory
					- 1TB Hard Drive - Black
				</span>
				<div className='group-price'>
					<span className='group-price__star'>{showRating(3)}</span>
					<span className='price fw-7'>$34.45</span>
				</div>
			</article>
		</Col>
	);
}

export default Card;
