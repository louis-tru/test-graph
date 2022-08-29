import { BigInt } from "@graphprotocol/graph-ts"
import {
	AssetGlobal,
	Approval,
	ApprovalForAll,
	Transfer
} from "../generated/AssetGlobal/AssetGlobal"
import { ApprovalEntity, TransferEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
	// Entities can be loaded from the store using a string ID; this ID
	// needs to be unique across all entities of the same type
	let entity = ApprovalEntity.load(event.transaction.from.toHex())

	// Entities only exist after they have been saved to the store;
	// `null` checks allow to create entities on demand
	if (!entity) {
		entity = new ApprovalEntity(event.transaction.from.toHex())

		// Entity fields can be set using simple assignments
		entity.count = BigInt.fromI32(0)
	}

	// BigInt and BigDecimal math are supported
	entity.count = entity.count + BigInt.fromI32(1)

	// Entity fields can be set based on event parameters
	entity.owner = event.params.owner
	entity.approved = event.params.approved
	entity.tokenId = event.params.tokenId

	// Entities can be written to the store with `.save()`
	entity.save()

	// Note: If a handler doesn't require existing field values, it is faster
	// _not_ to load the entity from the store. Instead, create it fresh with
	// `new Entity(...)`, set the fields that should be updated and save the
	// entity back to the store. Fields that were not set or unset remain
	// unchanged, allowing for partial updates to be applied.

	// It is also possible to access smart contracts from mappings. For
	// example, the contract that has emitted the event can be connected to
	// with:
	//
	// let contract = Contract.bind(event.address)
	//
	// The following functions can then be called on this contract to access
	// state variables and other data:
	//
	// - contract.balanceOf(...)
	// - contract.baseURI(...)
	// - contract.description(...)
	// - contract.getApproved(...)
	// - contract.host(...)
	// - contract.impl(...)
	// - contract.isApprovedForAll(...)
	// - contract.name(...)
	// - contract.operator(...)
	// - contract.ownerOf(...)
	// - contract.supportsInterface(...)
	// - contract.symbol(...)
	// - contract.tokenByIndex(...)
	// - contract.tokenOfOwnerByIndex(...)
	// - contract.tokenURI(...)
	// - contract.totalSupply(...)
	// - contract.onERC721Received(...)
	// - contract.onERC721LockReceived(...)
	// - contract.convertTokenID(...)
	// - contract.assetMeta(...)
	// - contract.contractURI(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {

}

export function handleTransfer(event: Transfer): void {
	let entity = new TransferEntity(event.transaction.hash.toHex())
	entity.from = event.params.from;
	entity.to = event.params.to;
	entity.tokenId = event.params.tokenId;
	entity.save();
	// let c = AssetGlobal.bind(event.address);
}
