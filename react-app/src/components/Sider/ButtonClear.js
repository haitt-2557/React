import React from 'react';

function ButtonClear() {
	return (
		<div className='clear text-center mt-2 mb-2'>
			<button className='btn-clear-filter'>
				<i className='fas fa-eraser mr-2'></i>
				Clear all filter
			</button>
		</div>
	);
}

export default ButtonClear;
