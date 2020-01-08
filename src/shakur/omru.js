
import traverse from 'traverse';

const clean_category_up_its_filthy = (
  (
    {
      category: category_series,
    }
  ) => {
    let category = (
      category_series
    );
    if (
      Array.isArray(category_series)
    ) {
      // pretend i dont reduce
      category_series.forEach(
        (another_line_of_categories) => {
          category = (
            `${category} ${another_line_of_categories}`
          );
        }
      );
    }

    category = (
      category.replace(/\#/g, ' ').replace(/\-/g, '_').split(' ')
    );

    let no_empty_strings = (
      []
    );
    category.forEach(
      (tag) => {
        if (
          tag !== ''
        ) {
          no_empty_strings = (
            [
              ...no_empty_strings,
              ...(
                [
                  tag,
                ]
              ),
            ]
          );
        }
      }
    );
    category = (
      no_empty_strings
    );

    return (
      {
        category,
      }
    );
  }
);

const give_me_endpoints_in_the_reference_according_to_category = (
  (
    {
      reference,
      category,
    }
  ) => {
    let endpoints = (
      []
    );
    traverse.forEach(
      reference,
      function (category_node) {
        if (
          this.isLeaf
        ) {
          const the_path_to_here = (
            this.path || []
          );
          const most_important_last_tag_of_the_reference_uri = (
            the_path_to_here[
              the_path_to_here.length - 1
            ]
          );
          endpoints = (
            [
              ...endpoints,
              ...(
                [
                  {
                    tag: (
                      most_important_last_tag_of_the_reference_uri
                    ),
                    uri: (
                      the_path_to_here
                    ),
                  },
                ]
              ),
            ]
          );
        }
      }
    );
    return (
      {
        endpoints,
      }
    );
  }
);

const find_me_all_the_location_options = (
  (
    {
      locations,
      tag: tag_rhs,
    }
  ) => {
    let options_for_a_tag_in_the_reference = (
      []
    );
    locations.forEach(
      (
        {
          tag: tag_lhs__each_tag_is_the_last_component_of_the_uri,
          uri,
        }
      ) => {
        const is_this_an_option_for_the_tag = (
          tag_lhs__each_tag_is_the_last_component_of_the_uri === tag_rhs
        );
        if (
          is_this_an_option_for_the_tag
        ) {
          options_for_a_tag_in_the_reference = (
            [
              ...options_for_a_tag_in_the_reference,
              ...(
                [
                  {
                    tag: (
                      tag_rhs
                    ),
                    uri,
                  },
                ]
              ),
            ]
          );
        }
      }
    );
    return (
      {
        options_for_a_tag_in_the_reference,
      }
    );
  }
);

const do_categories_intersect = (
  (
    {
      category,
      step: category_part,
    }
  ) => {
    // if the category part exists
    // in the category
    //
    //
    let affirmative;
    if (
      category.some(
        (a_tag) => (a_tag === category_part)
      )
    ) {
      affirmative = (
        true
      );
    }
    return (
      {
        affirmative,
        negative: (
          !affirmative
        ),
      }
    );
  }
);

const score_category_order = (
  (
    {
      category,
      location: {
        uri,
      },
    }
  ) => {
    const uri_as_order_indices = (
      uri.map(
        (step) => {
          let index_in_category = (
            -1
          );
          category.forEach(
            (tag, index) => {
              if (
                tag === step
              ) {
                index_in_category = (
                  index
                );
              }
            }
          );
          return (
            index_in_category
          );
        }
      )
    );

    // build
    // where
    //
    //    [ order, order, order ]
    //    [1, 2, 3, 4, 5, 6, 7]
    //    [3, 4, 1, 2, 7, 5, 6]
    //
    //      does my order ever descend instead of ascend
    //      score - each descension
    //
    //
    //

    let descension_count = (
      0
    );
    let last_order_index = (
      -1
    );
    uri_as_order_indices.forEach(
      (order) => {
        if (
          order < last_order_index
        ) {
          descension_count = (
            descension_count + 1
          );
        }
        last_order_index = (
          order
        );
      }
    );

    return (
      {
        order_score: (
          descension_count
        ),
      }
    )
  }
);

const score_category_location_match = (
  (
    {
      category,
      location: {
        tag,
        uri,
      },
    }
  ) => {
    let score = (
      0
    );
    uri.forEach(
      (step) => {
        const {
          affirmative,
        } = (
          do_categories_intersect(
            {
              category,
              step,
            }
          )
        );
        if (
          affirmative
        ) {
          score = (
            score + 1
          );
        }
      }
    );
    const {
      order_score
    } = (
      score_category_order(
        {
          category,
          location: {
            uri,
          },
        }
      )
    );
    score = (
      score + order_score
    );
    return (
      {
        score,
      }
    );
  }
);

const find_the_best_option_of = (
  (
    {
      category,
      options_for_a_tag_in_the_reference,
    }
  ) => {
    // score the tags options
    //
    //
    //
    const scored_options = (
      options_for_a_tag_in_the_reference.map(
        (location) => {
          const {
            score,
          } = (
            score_category_location_match(
              {
                category,
                location,
              }
            )
          );
          return (
            {
              ...location,
              ...(
                {
                  score,
                }
              ),
            }
          );
        }
      )
    );

    // pick the highest score
    //
    //
    //
    let highest_score;
    scored_options.forEach(
      (scored_option) => {
        if (
          !highest_score || scored_option.score > highest_score.score
        ) {
          highest_score = (
            scored_option
          );
        }
      }
    );

    // extract the best option
    // from the highest score
    //
    //
    let best_option;
    if (
      highest_score
    ) {
      best_option = (
        highest_score.uri
      );
    }

    return (
      {
        best_option,
      }
    );
  }
);

const best_endpoint_in_the_reference = (
  (
    {
      reference,
      category,
      locations,
      location: {
        uri,
        tag,
      },
    }
  ) => {
    const {
      options_for_a_tag_in_the_reference,
    } = (
      find_me_all_the_location_options(
        {
          locations,
          tag,
        }
      )
    );
    const {
      best_option: best_endpoint,
    } = (
      find_the_best_option_of(
        {
          category,
          options_for_a_tag_in_the_reference,
        }
      )
    );
    return (
      {
        best_endpoint,
      }
    );
  }
);

const give_me_ordered_locations = (
  (
    {
      reference,
      category,
      endpoints,
    }
  ) => {
    let ordered_locations = (
      []
    );
    endpoints.forEach(
      (endpoint) => {
        const {
          best_endpoint,
        } = (
          best_endpoint_in_the_reference(
            {
              reference,
              category,
              locations: (
                endpoints
              ),
              location: (
                endpoint
              ),
            }
          )
        );
        if (
          best_endpoint
        ) {
          ordered_locations = (
            [
              ...ordered_locations,
              ...(
                [
                  best_endpoint,
                ]
              ),
            ]
          );
        }
      }
    );
    return (
      {
        ordered_locations,
      }
    );
  }
);

const sequence = (
  (
    {
      reference,
      category: at_best_an_array_of_strings__category,
    }
  ) => {
    const {
      category,
    } = (
      clean_category_up_its_filthy(
        {
          category: (
            at_best_an_array_of_strings__category
          ),
        }
      )
    );
    const {
      endpoints,
    } = (
      give_me_endpoints_in_the_reference_according_to_category(
        {
          reference,
          category,
        }
      )
    );
    const {
      ordered_locations,
    } = (
      give_me_ordered_locations(
        {
          reference,
          category,
          endpoints,
        }
      )
    );
    return (
      {
        locations: (
          ordered_locations
        ),
      }
    );
  }
);

export default (
  sequence
);
