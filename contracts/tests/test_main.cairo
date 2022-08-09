%lang starknet
from src.main import create_proposal, get_proposal, count_proposals, vote_for_proposal, get_proposal_answers, view_proposal_text
from starkware.cairo.common.cairo_builtins import HashBuiltin


@external
func test_create_proposal{syscall_ptr : felt*, range_check_ptr, pedersen_ptr : HashBuiltin*}():
    let (count) = count_proposals()
    assert count = 0

    let text1 = 'test'
    let text2 = 'test'
    let max_vote = 3

    create_proposal(text1, text2, max_vote)

    let (count1) = count_proposals()
    assert count1 = 1

    return ()
end


@external
func test_get_proposal{syscall_ptr : felt*, range_check_ptr, pedersen_ptr : HashBuiltin*}():
    let (count) = count_proposals()
    assert count = 0
    %{ stop_prank_callable = start_prank(123) %}

    let text1 = 'test'
    let text2 = 'test'
    let max_vote = 3

    create_proposal(text1, text2, max_vote)


    let (proposal) = get_proposal(0)
    assert proposal.max_vote = max_vote
    assert proposal.creator = 123
    %{ stop_prank_callable() %}
    
    return ()
end


@external
func test_vote_for_proposal{syscall_ptr : felt*, range_check_ptr, pedersen_ptr : HashBuiltin*}():
    let text1 = 'test'
    let text2 = 'test'
    let max_vote = 3

    create_proposal(text1, text2, max_vote)

    vote_for_proposal(0, 1)

    let (vote_count) = get_proposal_answers(0, 1)
    assert vote_count = 1

    # TODO: check is i can revote for this one

    return ()
end

@external
func test_vote_not_valid_for_proposal{syscall_ptr : felt*, range_check_ptr, pedersen_ptr : HashBuiltin*}():
    let text1 = 'test'
    let text2 = 'test'
    let max_vote = 3

    create_proposal(text1, text2, max_vote)

    vote_for_proposal(0, 4)

    # read proposal text and check if text is the same as text1
    let (t1, t2) = view_proposal_text(0)
    assert t1 = text1
    assert t2 = text2

    # TODO: check is i can revote for this one

    return ()
end