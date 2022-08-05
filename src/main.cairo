# Declare this file as a StarkNet contract.
%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.syscalls import get_caller_address

struct Proposal:
    member creator: felt
    member text: felt
    member max_vote: felt
end

# array of proposal
@storage_var
func proposals(idx: felt) -> (proposal: Proposal):
end

@storage_var
func proposals_len() -> (count: felt):
end


# external function for create a proposal
@external
func create_proposal{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(text: felt, max_vote: felt):
    let (sender_address) = get_caller_address()

    let proposal = Proposal(creator=sender_address, text=text, max_vote=max_vote)
    let idx = proposals_len.read()
    
    proposals.write(idx.count, proposal)
    proposals_len.write(idx.count + 1)

    return ()
end

# Returns the current balance.
@view
func get_proposal{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(idx: felt) -> (
        res : Proposal):
    let (res) = proposals.read(idx)
    return (res)
end

@view
func count_proposals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        res : felt):
    let (res) = proposals_len.read()
    return (res)
end
