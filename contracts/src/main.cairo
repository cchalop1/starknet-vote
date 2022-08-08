# Declare this file as a StarkNet contract.
%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.syscalls import get_caller_address
from starkware.cairo.common.math import assert_not_zero, assert_le

struct Proposal:
    member creator : felt
    member text : felt
    member max_vote : felt
end

# array of proposal
@storage_var
func proposals(idx : felt) -> (proposal : Proposal):
end

@storage_var
func proposals_len() -> (count : felt):
end

# array of answer
@storage_var
func answers(proposal_id : felt, option_id : felt) -> (amount : felt):
end

@storage_var
func blacklist_address(proposal_id : felt) -> (address : felt):
end

@event
func proposal_created(
    proposal_id: felt
):
end

# external function for create a proposal
@external
func create_proposal{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    text : felt, max_vote : felt
):
    let (sender_address) = get_caller_address()

    let proposal = Proposal(creator=sender_address, text=text, max_vote=max_vote)
    let idx = proposals_len.read()

    proposals.write(idx.count, proposal)
    proposals_len.write(idx.count + 1)
    
    proposal_created.emit(proposal_id=idx.count)

    return ()
end

@external
func vote_for_proposal{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    proposal_id : felt, option_id : felt
):
    let (proposal) = get_proposal(proposal_id)

    # assert_not_zero(proposal.creator)
    # assert_le(option_id, proposal.max_vote)

    let (amount) = answers.read(proposal_id, option_id)

    let (sender_address) = get_caller_address()
    # TODO: check if address is not in blacklist
    
    answers.write(proposal_id, option_id, amount + 1)
    blacklist_address.write(proposal_id, sender_address)

    return ()
end

# Returns the current balance.
@view
func get_proposal{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    proposal_id : felt
) -> (res : Proposal):
    let (res) = proposals.read(proposal_id)
    return (res)
end

@view
func get_proposal_answers{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    proposal_id : felt, option_id : felt
) -> (amount : felt):
    let (res) = answers.read(proposal_id, option_id)
    return (res)
end

@view
func count_proposals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    res : felt
):
    let (res) = proposals_len.read()
    return (res)
end
