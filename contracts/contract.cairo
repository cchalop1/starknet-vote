# Declare this file as a StarkNet contract.
%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

struct Proposal:
    member id: felt
    member creator_id: felt
    member text: felt
end

struct Answer:
    member id: felt
    member text: felt
    member proposal_id: felt
    member count: felt
end

# array of proposal

# array of answer



# external function for create a proposal

@external
func create_proposal{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}:
    let (sender_address) = get_caller_address()

end


@storage_var
func balance() -> (res : felt):
end

# Returns the current balance.
@view
func get_balance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        res : felt):
    let (res) = balance.read()
    return (res)
end
