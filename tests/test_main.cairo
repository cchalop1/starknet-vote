%lang starknet
from src.main import create_proposal, get_proposal, count_proposals, vote_for_proposal, get_proposal_answers
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


@external
func test_vote_for_proposal{syscall_ptr : felt*, range_check_ptr, pedersen_ptr : HashBuiltin*}():
    let text = 'test'
    let max_vote = 3

    create_proposal(text, max_vote)

    vote_for_proposal(0, 1)

    let (vote_count) = get_proposal_answers(0, 1)
    assert vote_count = 1

    # TODO: check is i can revote for this one

    return ()
end

@external
func test_vote_not_valid_for_proposal{syscall_ptr : felt*, range_check_ptr, pedersen_ptr : HashBuiltin*}():
    let text = 'test'
    let max_vote = 3

    create_proposal(text, max_vote)

    vote_for_proposal(0, 4)

    # TODO: check is i can revote for this one

    return ()
end