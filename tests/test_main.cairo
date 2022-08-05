%lang starknet
from src.main import create_proposal, get_proposal, count_proposals
from starkware.cairo.common.cairo_builtins import HashBuiltin


@external
func test_create_proposal{syscall_ptr : felt*, range_check_ptr, pedersen_ptr : HashBuiltin*}():
    let (count) = count_proposals()
    assert count = 0

    let text = 'test'
    let max_vote = 3

    create_proposal(text, max_vote)

    let (count1) = count_proposals()
    assert count1 = 1

    return ()
end


@external
func test_get_proposal{syscall_ptr : felt*, range_check_ptr, pedersen_ptr : HashBuiltin*}():
    let (count) = count_proposals()
    assert count = 0

    let text = 'test'
    let max_vote = 3

    create_proposal(text, max_vote)


    let (proposal) = get_proposal(0)
    assert proposal.text = text
    assert proposal.max_vote = max_vote
    
    return ()
end



