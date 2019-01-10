import React from 'react'
import PropTypes from 'prop-types'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const PagePagination = props => (
	<Pagination size="sm" className="mt-4">
		<PaginationItem className={props.hasPreviousPage ? 'ml-auto' : 'ml-auto disabled'}>
			<PaginationLink onClick={props.onPreviousClick}>
        Previous
			</PaginationLink>
		</PaginationItem>
		<PaginationItem className={props.hasNextPage ? 'mr-auto' : 'mr-auto disabled'}>
			<PaginationLink onClick={props.onNextClick}>
        Next
			</PaginationLink>
		</PaginationItem>
	</Pagination>
)

PagePagination.propTypes = {
	onPreviousClick: PropTypes.func.isRequired,
	onNextClick: PropTypes.func.isRequired,
	hasPreviousPage: PropTypes.bool.isRequired,
	hasNextPage: PropTypes.bool.isRequired
}

export default PagePagination