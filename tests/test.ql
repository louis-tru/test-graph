{
	approvalEntities(first: 5) {
		id
		count
		owner
		approved
		count
	}
	approvalForAllEntities(first: 5) {
		id
		owner
		operator
		approved
	}
	transferEntities(first: 100) {
		id
		from
		to
		tokenId
	}
}