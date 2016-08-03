Feature: stellar_math

    Scenario Outline: api routes
        Given I make a "<method>" request to stellar_math on "<route>"
        And with a "<valid>" body in the request
        Then a "<result>" result is received

    Examples:
        | method | route              | valid   | result |
        | GET    | /health            | NA      | OKAY   |

    Scenario Outline: controller routes
        Given I make a "<method>" request to stellar_math on "<route>"
        And with a "<valid>" body in the request
        Then a "<status>" status code is received

    Examples:
        | method | route              | valid   | status |
        | GET    | /                  | NA      | 200    |